import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage = ({ onGetStarted }: LandingPageProps) => {
  const { toast } = useToast();
  
  const handleLogin = () => {
    onGetStarted();
    toast({
      title: "Welcome to Danny.ai",
      description: "Please sign in to continue.",
      duration: 3000,
    });

  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <header className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-800">
        <div className="text-xl font-bold text-orange-500">Danny.ai</div>
        <Button 
          variant="ghost" 
          onClick={handleLogin}
          className="text-orange-500 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20"
        >
          Sign In
        </Button>
      </header>
      
      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="container max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="w-full md:w-1/2">
            <div className="relative w-full aspect-square max-w-md mx-auto">

              <div className="absolute inset-0 bg-orange-100 rounded-full opacity-20 animate-pulse dark:bg-orange-900/30"></div>
              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-orange-200 rounded-full opacity-40 animate-pulse [animation-delay:750ms] dark:bg-orange-800/40"></div>
              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-orange-300 rounded-full opacity-60 animate-pulse [animation-delay:1500ms] dark:bg-orange-700/60"></div>
              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/4 h-1/4 bg-orange-500 rounded-full shadow-lg animate-pulse [animation-delay:2250ms]"></div>
              <div className="absolute top-1/4 right-1/4 p-3 bg-white rounded-lg shadow-lg animate-bounce [animation-delay:1000ms] dark:bg-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500">
                  <path d="M2 22v-5l5-5 5 5-5 5z"></path>
                  <path d="M9.5 14.5 16 8"></path>
                  <path d="M17 2V1h1"></path>
                  <path d="M17 6V5h1"></path>
                  <path d="M21 6h1v1"></path>
                  <path d="M21 2h1v1"></path>
                  <path d="M17 10V9h1"></path>
                  <path d="M21 10h1v1"></path>
                  <rect x="17" y="17" width="4" height="4"></rect>
                </svg>
              </div>
              
              <div className="absolute bottom-1/4 left-1/4 p-3 bg-white rounded-lg shadow-lg animate-bounce [animation-delay:2000ms] dark:bg-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500">
                  <path d="M3 21h18"></path>
                  <path d="M9 8h1"></path>
                  <path d="M9 12h1"></path>
                  <path d="M9 16h1"></path>
                  <path d="M14 8h1"></path>
                  <path d="M14 12h1"></path>
                  <path d="M14 16h1"></path>
                  <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-orange-500 mb-4">Danny.ai</h1>
            <h2 className="text-xl md:text-2xl text-gray-700 font-medium mb-6 dark:text-gray-300">
              Your AI construction project manager
            </h2>
            <p className="text-gray-600 mb-8 max-w-lg dark:text-gray-400">
            Danny.ai simplifies complex construction projects with intelligent sourcing, comprehensive project timelines, and powerful budget management tools. Let our AI assistant guide you seamlessly from planning to completion, no matter the scale or scope of your project.
            </p>
            <Button 
              onClick={handleLogin} 
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-2 rounded-md flex items-center gap-2"
            >
              Get Started
              <ArrowRightIcon size={16} />
            </Button>
          </div>
        </div>
      </main>

      <footer className="py-4 px-6 border-t border-gray-200 text-center text-gray-500 text-sm dark:border-gray-800 dark:text-gray-400">
        Danny.ai, Catapult Purdue 2025
      </footer>
    </div>
  );
};

export default LandingPage;