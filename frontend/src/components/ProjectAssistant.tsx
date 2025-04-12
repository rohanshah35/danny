import { useEffect, useRef, useState } from "react";
import { SendIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Message {
  id: number;
  sender: "user" | "system";
  message: string;
  timestamp: string;
}

const initialMessages: Message[] = [
  {
    id: 1,
    sender: "system",
    message:
      "Hi! I'm Danny, your smart sourcing agent. I can help you find the right materials, contractors, and suppliers for your home renovation project. How can I assist you today?",
    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  },
];

const ProjectAssistant = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState<string>("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of the chat container
  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      sender: "user",
      message: input,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulated system (Danny) response after short delay
    setTimeout(() => {
      const systemResponse: Message = {
        id: messages.length + 2,
        sender: "system",
        message:
          "I'm looking into that for you. Based on your project timeline and budget, I'd recommend exploring options for sustainable materials that can save you money in the long run.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, systemResponse]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Fixed-height container for messages with a subtle border */}
      <div className="h-[260px] bg-gray-50 border border-gray-200 rounded-lg">
        <div className="h-full w-full pr-4 overflow-auto" ref={scrollAreaRef}>
          <div className="space-y-4 p-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex flex-col max-w-[85%]",
                  msg.sender === "user" ? "ml-auto items-end" : "items-start"
                )}
              >
                <div
                  className={cn(
                    "px-4 py-3 rounded-2xl",
                    // Orange bubble for user messages
                    msg.sender === "user"
                      ? "bg-orange-500 text-white rounded-tr-none"
                      // Light gray bubble for system (Danny) messages
                      : "bg-gray-300 text-gray-900 rounded-tl-none"
                  )}
                >
                  <p className="text-sm">{msg.message}</p>
                </div>
                <div className="flex items-center mt-1 text-xs text-gray-500">
                  <span>{msg.sender === "user" ? "You" : "Danny"}</span>
                  <span className="mx-1">•</span>
                  <span>{msg.timestamp}</span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Input area at bottom */}
      <div className="mt-4">
        <div className="flex items-center gap-2 relative">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSendMessage();
            }}
            placeholder="Ask anything about your project..."
            className="flex-1 border-gray-200 rounded-full py-6 px-4"
          />
          <Button
            onClick={handleSendMessage}
            className="absolute right-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full p-2 h-10 w-10"
            size="icon"
          >
            <SendIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectAssistant;
