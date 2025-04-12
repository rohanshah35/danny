
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import ChatbotButton from "@/components/ChatbotButton";
import LoginModal from "@/components/LoginModal";
import LandingPage from "@/components/LandingPage";
import { useToast } from "@/hooks/use-toast";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);
  const location = useLocation();
  const { toast } = useToast();

  const handleLogin = (selectedUserType: string) => {
    setIsLoggedIn(true);
    setUserType(selectedUserType);
    
    toast({
      title: "Welcome to Danny.ai",
      description: `You are logged in as a ${selectedUserType}.`,
      duration: 3000,
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType(null);
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
      duration: 3000,
    });
  };

  // Determine if we should show the chatbot button (not on overview page)
  const showChatbot = isLoggedIn && location.pathname !== "/";

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      {isLoggedIn ? (
        <>
          <Sidebar onLogout={handleLogout} userType={userType} />
          <main className="flex-1 overflow-auto">
            {children}
          </main>
          {showChatbot && <ChatbotButton />}
        </>
      ) : (
        <div className="w-full">
          <LandingPage onSelectUserType={handleLogin} />
        </div>
      )}
      
      <LoginModal
        isOpen={showLoginModal && !isLoggedIn}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
      />
    </div>
  );
};

export default MainLayout;
