'use client';

import { Loader2, Sparkles, UtensilsCrossed } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useRef, useState } from 'react';
import type { ChatMessage, ParsedMeal } from '@/lib/types/meal';
import { MealCard } from './meal-card';
import { MealInput } from './meal-input';
import { MessageBubble } from './message-bubble';

function generateId() {
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function ChatArea() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: 'smooth',
        });
      }
    });
  }, []);

  const handleSubmit = async () => {
    const text = inputValue.trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: generateId(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    scrollToBottom();

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });

      if (!response.ok) {
        throw new Error('Failed to process meal');
      }

      const parsedMeal: ParsedMeal = await response.json();

      const assistantMessage: ChatMessage = {
        id: generateId(),
        role: 'assistant',
        content: '',
        parsedMeal,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      scrollToBottom();
    } catch {
      const errorMessage: ChatMessage = {
        id: generateId(),
        role: 'assistant',
        content: 'Sorry, I could not process that meal. Please try again.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      scrollToBottom();
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmMeal = (_messageId: string, _meal: ParsedMeal) => {
    // In-memory only — persistence comes later
  };

  const hasMessages = messages.length > 0;

  return (
    <main className="flex flex-1 flex-col self-stretch overflow-hidden">
      {/* Scrollable messages area */}
      <div
        ref={scrollRef}
        className="flex min-h-0 flex-1 flex-col overflow-y-auto px-0 py-6"
      >
        <AnimatePresence mode="wait">
          {!hasMessages && (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="flex flex-1 flex-col items-center justify-center gap-6"
            >
              {/* Decorative icon cluster */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  delay: 0.1,
                  type: 'spring',
                  stiffness: 200,
                }}
                className="relative"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#E8D5B5]/40 to-[#C9A87C]/20 shadow-inner">
                  <UtensilsCrossed className="h-7 w-7 text-[#8B7355]" />
                </div>
                <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#2C2416] shadow-sm">
                  <Sparkles className="h-2.5 w-2.5 text-[#C9A87C]" />
                </div>
              </motion.div>

              <div className="space-y-3 text-center">
                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="font-normal text-[#2C2416] text-[2.5rem] leading-tight tracking-tight"
                  style={{ fontFamily: 'Lora, serif' }}
                >
                  What are you having today?
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.5 }}
                  className="mx-auto max-w-sm text-[#8B7355] text-[15px] leading-relaxed"
                  style={{
                    fontFamily: 'DM Sans, sans-serif',
                  }}
                >
                  Describe your meal naturally — Vietnamese or English — and
                  I&apos;ll break down the macros for you.
                </motion.p>
              </div>

              {/* Suggestion chips */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="flex flex-wrap justify-center gap-2"
              >
                {['2 mực kho + cơm', 'Phở bò tái', 'Bún chả Hà Nội'].map(
                  (suggestion) => (
                    <button
                      type="button"
                      key={suggestion}
                      onClick={() => setInputValue(suggestion)}
                      className="rounded-full border border-[#E8D5B5]/60 bg-white/80 px-4 py-1.5 font-medium text-[#6B5D4F] text-xs shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#C9A87C]/40 hover:shadow-md"
                      style={{
                        fontFamily: 'DM Sans, sans-serif',
                      }}
                    >
                      {suggestion}
                    </button>
                  )
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {hasMessages && (
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
            <AnimatePresence initial={false}>
              {messages.map((msg) => {
                if (msg.role === 'user') {
                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 12, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{
                        type: 'spring',
                        stiffness: 350,
                        damping: 30,
                      }}
                    >
                      <MessageBubble message={msg} />
                    </motion.div>
                  );
                }

                if (msg.parsedMeal) {
                  return (
                    <motion.div
                      key={msg.id}
                      initial={{
                        opacity: 0,
                        y: 20,
                        scale: 0.95,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 28,
                      }}
                    >
                      <MealCard
                        message={msg}
                        onConfirm={(meal) => handleConfirmMeal(msg.id, meal)}
                      />
                    </motion.div>
                  );
                }

                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="max-w-[80%] rounded-2xl rounded-bl-sm border border-red-200/60 bg-red-50/80 px-4 py-3">
                      <p
                        className="text-red-700 text-sm"
                        style={{
                          fontFamily: 'DM Sans, sans-serif',
                        }}
                      >
                        {msg.content}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            <AnimatePresence>
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="flex justify-start"
                >
                  <div className="flex items-center gap-2.5 rounded-2xl rounded-bl-sm border border-[#E8D5B5]/30 bg-white px-4 py-3 shadow-sm">
                    <Loader2 className="h-4 w-4 animate-spin text-[#C9A87C]" />
                    <span
                      className="text-[#8B7355] text-sm"
                      style={{
                        fontFamily: 'DM Sans, sans-serif',
                      }}
                    >
                      Analyzing your meal...
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="px-4 pt-2 pb-4">
        <div className="mx-auto max-w-3xl">
          <MealInput
            value={inputValue}
            onChange={setInputValue}
            onSubmit={handleSubmit}
            disabled={isLoading}
          />
        </div>
      </div>
    </main>
  );
}
