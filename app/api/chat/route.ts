import { GoogleGenAI } from '@google/genai';
import { type NextRequest, NextResponse } from 'next/server';
import { toJSONSchema, z } from 'zod';

const macroSchema = z.object({
  calories: z.number().describe('Calories in kcal'),
  protein: z.number().describe('Protein in grams'),
  carbs: z.number().describe('Carbohydrates in grams'),
  fat: z.number().describe('Fat in grams'),
});

const mealItemSchema = z.object({
  id: z.string().describe('Unique identifier, e.g. "item-1"'),
  name: z
    .string()
    .describe('Ingredient name, Vietnamese preferred when input is Vietnamese'),
  quantity: z.number().describe('Quantity of the ingredient'),
  unit: z
    .string()
    .describe('Unit of measurement: phần, chén, g, ml, con, miếng, etc.'),
  macros: macroSchema,
});

const parsedMealSchema = z.object({
  mealName: z.string().describe('Brief meal description'),
  items: z.array(mealItemSchema),
  totalMacros: macroSchema.describe('Sum of all items macros'),
});

const SYSTEM_PROMPT = `You are a Vietnamese cuisine nutrition expert. When a user describes a meal in Vietnamese or English, parse it into structured nutritional data.

Guidelines:
- Use Vietnamese ingredient names when the input is Vietnamese
- Use realistic macro values based on FAO/WHO Vietnam data and common Vietnamese cooking methods
- Account for cooking oils, sauces, and hidden fats in braised/fried dishes
- Portion sizes should reflect typical Vietnamese servings
- totalMacros must equal the sum of all items' macros
- Generate unique IDs for each item (e.g., "item-1", "item-2")
- Protein, carbs, fat in grams; calories in kcal`;

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY is not configured' },
        { status: 500 }
      );
    }

    const { message } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        responseMimeType: 'application/json',
        responseJsonSchema: toJSONSchema(parsedMealSchema),
      },
    });

    const parsed = parsedMealSchema.parse(JSON.parse(response.text ?? ''));

    return NextResponse.json(parsed);
  } catch (error) {
    console.error('Chat API error:', error);

    const errorMessage =
      error instanceof Error ? error.message : 'Failed to process meal';
    const isRateLimit = errorMessage.includes('429');

    return NextResponse.json(
      {
        error: isRateLimit
          ? 'Rate limited — please wait a moment and try again'
          : 'Failed to process meal',
      },
      { status: isRateLimit ? 429 : 500 }
    );
  }
}
