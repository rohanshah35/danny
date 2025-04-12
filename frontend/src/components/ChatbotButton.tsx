
import { useState } from "react";
import { MessageSquareTextIcon, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const ChatbotButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 h-96 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden animate-fade-in dark:bg-gray-900 dark:border-gray-800">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
            <h3 className="font-medium">Danny Assistant</h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <XIcon size={16} />
            </button>
          </div>
          <div className="p-4 h-72 overflow-y-auto">
            <div className="bg-gray-100 p-3 rounded-lg mb-2 max-w-[80%] dark:bg-gray-800">
              Hi there! I'm Danny, your smart sourcing agent. How can I help you today?
            </div>
            {/* Chatbot messages would go here */}
          </div>
          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex">
              <input 
                type="text" 
                placeholder="Type your message..." 
                className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-orange-500 dark:bg-gray-800 dark:border-gray-700"
              />
              <button className="bg-orange-500 text-white px-4 rounded-r-lg hover:bg-orange-600">
                Send
              </button>
            </div>
          </div>
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-colors duration-200",
          isOpen ? "bg-gray-600 hover:bg-gray-700" : "bg-orange-500 hover:bg-orange-600"
        )}
        aria-label="Chat with Danny"
      >
        {isOpen ? (
          <XIcon className="text-white" size={24} />
        ) : (
          <MessageSquareTextIcon className="text-white" size={24} />
        )}
      </button>
    </div>
  );
};

export default ChatbotButton;
