import { useEffect, useRef, useState } from "react";
import axios from "axios";
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
      "Hello! I'm Danny, your intelligent project assistant, here to help with any questions you have about your project or the process overall. How can I assist you today?",
    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  },
];

const TypingIndicator = () => {
  return (
    <div className="flex flex-col max-w-[85%] items-start">
      <div className="px-4 py-3 rounded-2xl bg-gray-300 text-gray-900 rounded-tl-none">
        <p className="text-sm">
          Danny is typing
          <span className="inline-block ml-1 animate-bounce">.</span>
          <span className="inline-block ml-1 animate-bounce delay-200">.</span>
          <span className="inline-block ml-1 animate-bounce delay-400">.</span>
        </p>
      </div>
      <div className="flex items-center mt-1 text-xs text-gray-500">
        <span>Danny</span>
        <span className="mx-1">•</span>
        <span>{new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
      </div>
    </div>
  );
};

const ProjectAssistant = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const newUserMessage: Message = {
      id: messages.length + 1,
      sender: "user",
      message: input,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setIsLoading(true);

    const customerId = "11111111-1111-1111-1111-111111111111";

    try {
      const response = await axios.post("http://localhost:8000/llm/chat", {
        customer_id: customerId,
        query: input,
      });

      const systemResponse: Message = {
        id: messages.length + 2,
        sender: "system",
        message: response.data.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, systemResponse]);
    } catch {
      const errorMessage: Message = {
        id: messages.length + 2,
        sender: "system",
        message: "Sorry, I was unable to retrieve a response at this time.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setInput("");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
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
                    msg.sender === "user"
                      ? "bg-orange-500 text-white rounded-tr-none"
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
            {isLoading && <TypingIndicator />}
          </div>
        </div>
      </div>

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
