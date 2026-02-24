'use client';

import { Check, Minus, Pencil, Plus, Sparkles, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import type {
  ChatMessage,
  MacroBreakdown,
  MealItem,
  ParsedMeal,
} from '@/lib/types/meal';
import { cn } from '@/lib/utils';

interface MealCardProps {
  message: ChatMessage;
  onConfirm?: (meal: ParsedMeal) => void;
}

const MACRO_COLORS = {
  calories: 'text-[#2C2416]',
  protein: 'text-blue-600',
  carbs: 'text-amber-600',
  fat: 'text-rose-500',
} as const;

function recalculateTotals(items: MealItem[]): MacroBreakdown {
  return items.reduce(
    (acc, item) => ({
      calories: acc.calories + item.macros.calories,
      protein: acc.protein + item.macros.protein,
      carbs: acc.carbs + item.macros.carbs,
      fat: acc.fat + item.macros.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );
}

export function MealCard({ message, onConfirm }: MealCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [savedItems, setSavedItems] = useState<MealItem[]>(
    message.parsedMeal?.items ?? []
  );
  const [editedItems, setEditedItems] = useState<MealItem[]>(
    message.parsedMeal?.items ?? []
  );

  const meal = message.parsedMeal;
  if (!meal) return null;

  const currentItems = isEditing ? editedItems : savedItems;
  const currentTotals = recalculateTotals(currentItems);

  const handleQuantityChange = (itemId: string, delta: number) => {
    setEditedItems((prev) =>
      prev.map((item) => {
        if (item.id !== itemId) return item;
        const originalItem = meal.items.find((i) => i.id === itemId);
        if (!originalItem) return item;

        const newQuantity = Math.max(0, item.quantity + delta);
        const ratio =
          originalItem.quantity > 0 ? newQuantity / originalItem.quantity : 0;

        return {
          ...item,
          quantity: newQuantity,
          macros: {
            calories: originalItem.macros.calories * ratio,
            protein: originalItem.macros.protein * ratio,
            carbs: originalItem.macros.carbs * ratio,
            fat: originalItem.macros.fat * ratio,
          },
        };
      })
    );
  };

  const handleEdit = () => {
    setEditedItems([...savedItems]);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedItems(savedItems);
  };

  const handleSaveEdit = () => {
    setSavedItems(editedItems);
    setIsEditing(false);
  };

  const handleConfirm = () => {
    setConfirmed(true);
    setIsEditing(false);
    if (onConfirm) {
      onConfirm({
        ...meal,
        items: savedItems,
        totalMacros: recalculateTotals(savedItems),
      });
    }
  };

  return (
    <div className="flex justify-start">
      <div className="w-full max-w-[92%]">
        {/* Card */}
        <div className="overflow-hidden rounded-2xl rounded-bl-sm border border-[#d4c4a8] bg-white shadow-[0_2px_16px_rgba(0,0,0,0.08)]">
          {/* Header */}
          <div className="flex items-center justify-between border-[#E8D5B5]/50 border-b bg-[#f5efe5] px-4 py-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2C2416] shadow-sm">
                <Sparkles className="h-3.5 w-3.5 text-[#C9A87C]" />
              </div>
              <span
                className="font-semibold text-[#2C2416] text-[11px] uppercase tracking-wider"
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                }}
              >
                {meal.mealName}
              </span>
            </div>

            {/* Edit ↔ Cancel toggle */}
            {!confirmed && (
              <AnimatePresence mode="wait" initial={false}>
                {isEditing ? (
                  <motion.button
                    key="cancel"
                    type="button"
                    onClick={handleCancelEdit}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center gap-1.5 rounded-full border border-rose-200/60 bg-rose-50/60 px-2.5 py-1 text-rose-500 transition-colors hover:border-rose-300/60 hover:bg-rose-50"
                  >
                    <X className="h-3 w-3" />
                    <span
                      className="font-medium text-[10px]"
                      style={{ fontFamily: 'DM Sans, sans-serif' }}
                    >
                      Cancel
                    </span>
                  </motion.button>
                ) : (
                  <motion.button
                    key="edit"
                    type="button"
                    onClick={handleEdit}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center gap-1.5 rounded-full border border-[#E8D5B5]/50 px-2.5 py-1 text-[#8B7355] transition-colors hover:border-[#C9A87C]/50 hover:bg-[#F0EAE0]/40 hover:text-[#2C2416]"
                  >
                    <Pencil className="h-3 w-3" />
                    <span
                      className="font-medium text-[10px]"
                      style={{ fontFamily: 'DM Sans, sans-serif' }}
                    >
                      Edit
                    </span>
                  </motion.button>
                )}
              </AnimatePresence>
            )}
          </div>

          {/* Column headers */}
          <div className="grid grid-cols-[1fr_4rem_3rem_3rem_3rem] items-center gap-1 border-[#E8D5B5]/30 border-b bg-[#FEFBF6]/80 px-4 py-1.5 text-[9px]">
            <span
              className="font-semibold text-[#8B7355] uppercase tracking-wider"
              style={{
                fontFamily: 'DM Sans, sans-serif',
              }}
            >
              Item
            </span>
            <span
              className="text-right font-semibold text-[#8B7355] uppercase tracking-wider"
              style={{
                fontFamily: 'DM Sans, sans-serif',
              }}
            >
              Cal
            </span>
            <span
              className="text-right font-semibold text-blue-500 uppercase tracking-wider"
              style={{
                fontFamily: 'DM Sans, sans-serif',
              }}
            >
              Pro
            </span>
            <span
              className="text-right font-semibold text-amber-500 uppercase tracking-wider"
              style={{
                fontFamily: 'DM Sans, sans-serif',
              }}
            >
              Carb
            </span>
            <span
              className="text-right font-semibold text-rose-400 uppercase tracking-wider"
              style={{
                fontFamily: 'DM Sans, sans-serif',
              }}
            >
              Fat
            </span>
          </div>

          {/* Items list */}
          <div className="divide-y divide-[#F0EAE0]/40 px-4">
            {currentItems.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={cn(
                  'grid grid-cols-[1fr_4rem_3rem_3rem_3rem] items-center gap-1 py-2.5 text-xs',
                  isEditing && 'rounded-lg bg-[#FEFBF6]/80'
                )}
              >
                {/* Item name + quantity controls */}
                <div className="flex items-center gap-2">
                  {isEditing && (
                    <div className="flex items-center gap-0.5">
                      <button
                        type="button"
                        onClick={() =>
                          handleQuantityChange(
                            item.id,
                            item.unit === 'g' || item.unit === 'ml' ? -10 : -1
                          )
                        }
                        className="flex h-5 w-5 items-center justify-center rounded-md border border-[#E8D5B5]/60 bg-white text-[#8B7355] transition-colors hover:bg-[#F0EAE0]"
                      >
                        <Minus className="h-2.5 w-2.5" />
                      </button>
                      <span
                        className="w-7 text-center font-semibold text-[#2C2416] text-[11px] tabular-nums"
                        style={{
                          fontFamily: 'DM Sans, sans-serif',
                        }}
                      >
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          handleQuantityChange(
                            item.id,
                            item.unit === 'g' || item.unit === 'ml' ? 10 : 1
                          )
                        }
                        className="flex h-5 w-5 items-center justify-center rounded-md border border-[#E8D5B5]/60 bg-white text-[#8B7355] transition-colors hover:bg-[#F0EAE0]"
                      >
                        <Plus className="h-2.5 w-2.5" />
                      </button>
                    </div>
                  )}
                  <div className="min-w-0">
                    <p
                      className="truncate font-medium text-[#2C2416] text-[13px]"
                      style={{
                        fontFamily: 'DM Sans, sans-serif',
                      }}
                    >
                      {item.name}
                    </p>
                    <p
                      className="text-[#8B7355] text-[10px]"
                      style={{
                        fontFamily: 'DM Sans, sans-serif',
                      }}
                    >
                      {item.quantity} {item.unit}
                    </p>
                  </div>
                </div>

                {/* Macros */}
                <span
                  className={cn(
                    'text-right font-semibold tabular-nums',
                    MACRO_COLORS.calories
                  )}
                  style={{
                    fontFamily: 'DM Sans, sans-serif',
                  }}
                >
                  {Math.round(item.macros.calories)}
                </span>
                <span
                  className={cn(
                    'text-right font-medium tabular-nums',
                    MACRO_COLORS.protein
                  )}
                  style={{
                    fontFamily: 'DM Sans, sans-serif',
                  }}
                >
                  {Math.round(item.macros.protein)}g
                </span>
                <span
                  className={cn(
                    'text-right font-medium tabular-nums',
                    MACRO_COLORS.carbs
                  )}
                  style={{
                    fontFamily: 'DM Sans, sans-serif',
                  }}
                >
                  {Math.round(item.macros.carbs)}g
                </span>
                <span
                  className={cn(
                    'text-right font-medium tabular-nums',
                    MACRO_COLORS.fat
                  )}
                  style={{
                    fontFamily: 'DM Sans, sans-serif',
                  }}
                >
                  {Math.round(item.macros.fat)}g
                </span>
              </motion.div>
            ))}
          </div>

          {/* Totals row */}
          <div className="grid grid-cols-[1fr_4rem_3rem_3rem_3rem] items-center gap-1 border-[#E8D5B5]/50 border-t bg-[#FEFBF6]/90 px-4 py-3 text-xs">
            <span
              className="font-semibold text-[#2C2416] text-sm"
              style={{ fontFamily: 'Lora, serif' }}
            >
              Total
            </span>
            <span
              className="text-right font-bold text-[#2C2416] tabular-nums"
              style={{
                fontFamily: 'DM Sans, sans-serif',
              }}
            >
              {Math.round(currentTotals.calories)}
            </span>
            <span
              className="text-right font-semibold text-blue-600 tabular-nums"
              style={{
                fontFamily: 'DM Sans, sans-serif',
              }}
            >
              {Math.round(currentTotals.protein)}g
            </span>
            <span
              className="text-right font-semibold text-amber-600 tabular-nums"
              style={{
                fontFamily: 'DM Sans, sans-serif',
              }}
            >
              {Math.round(currentTotals.carbs)}g
            </span>
            <span
              className="text-right font-semibold text-rose-500 tabular-nums"
              style={{
                fontFamily: 'DM Sans, sans-serif',
              }}
            >
              {Math.round(currentTotals.fat)}g
            </span>
          </div>

          {/* Confirmed banner */}
          {confirmed && (
            <div className="flex items-center justify-center gap-2 border-[#E8D5B5]/50 border-t bg-[#f0ebe3] px-4 py-3">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15">
                <Check className="h-3 w-3 text-emerald-600" />
              </div>
              <span
                className="font-medium text-emerald-700 text-xs"
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                }}
              >
                Meal logged successfully
              </span>
            </div>
          )}
        </div>

        {/* Action button — outside the card */}
        {!confirmed && (
          <div className="mt-2 flex">
            {/* Cancel — slides in from the left */}
            <motion.div
              className="shrink-0 overflow-hidden"
              animate={{ width: isEditing ? '50%' : '0%' }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="h-full pr-2">
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="flex h-full w-full items-center justify-center gap-1.5 rounded-xl border border-[#E8D5B5]/70 bg-white px-3 py-2.5 font-medium text-[#8B7355] text-xs shadow-sm transition-all duration-200 hover:border-[#C9A87C]/50 hover:bg-[#F0EAE0]/60"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                >
                  <X className="h-3.5 w-3.5 shrink-0" />
                  Cancel
                </button>
              </div>
            </motion.div>

            {/* Confirm / Save — always flex-1, text fades between states */}
            <button
              type="button"
              onClick={isEditing ? handleSaveEdit : handleConfirm}
              className="relative flex flex-1 items-center justify-center gap-1.5 overflow-hidden rounded-xl bg-[#695e4e] px-3 py-2.5 font-medium text-white text-xs shadow-sm transition-all duration-200 hover:bg-[#5a5043] hover:shadow-md"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isEditing ? (
                  <motion.span
                    key="save"
                    className="flex items-center gap-1.5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Check className="h-3.5 w-3.5 shrink-0" />
                    Save Changes
                  </motion.span>
                ) : (
                  <motion.span
                    key="confirm"
                    className="flex items-center gap-1.5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Check className="h-3.5 w-3.5 shrink-0" />
                    Confirm &amp; Log Meal
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        )}

        <p
          className="mt-1.5 ml-1 text-left text-[#8B7355]/50 text-[10px]"
          style={{ fontFamily: 'DM Sans, sans-serif' }}
        >
          {message.timestamp.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
    </div>
  );
}
