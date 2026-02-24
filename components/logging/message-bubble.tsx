import type { ChatMessage } from '@/lib/types/meal';

interface MessageBubbleProps {
  message: ChatMessage;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[80%]">
        <div className="rounded-2xl rounded-br-sm border border-[#C9A87C]/20 bg-[#C9A87C]/15 px-4 py-3 shadow-sm">
          <p
            className="break-words font-medium text-foreground text-sm leading-relaxed"
            style={{ fontFamily: 'Lora, serif' }}
          >
            {message.content}
          </p>
        </div>
        <p
          className="mt-1.5 mr-1 text-right text-[10px] text-muted-foreground/60"
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
