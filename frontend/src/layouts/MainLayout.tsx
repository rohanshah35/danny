import { useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import ChatbotButton from "@/components/ChatbotButton";
import LoginModal from "@/components/LoginModal";
import SignUpModal from "@/components/SignUpModal";
import LandingPage from "@/components/LandingPage";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);
  const [showLanding, setShowLanding] = useState(true);
  const location = useLocation();
  const { toast } = useToast();
  const navigate = useNavigate();
 
  const handleLogin = (selectedUserType: string) => {
    setIsLoggedIn(true);
    setUserType(selectedUserType);
    setShowLanding(false);
    setShowLoginModal(false);
    navigate("/overview");
   
    toast({
      title: "Welcome to Danny.ai",
      description: `You are logged in as a ${selectedUserType}.`,
      duration: 3000,
    });
  };

  const handleSignUp = (selectedUserType: string) => {

    setShowSignUpModal(false);
    setShowLoginModal(true);
   
    toast({
      title: "Account created",
      description: `Your ${selectedUserType} account has been created. Please sign in.`,
      duration: 3000,
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType(null);
    setShowLanding(true);
   
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
      duration: 3000,
    });
  };

  const handleGetStarted = () => {
    setShowLoginModal(true);
    setShowLanding(false);
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
    setShowLanding(true);
  };

  const handleCloseSignUpModal = () => {
    setShowSignUpModal(false);
    setShowLoginModal(true);
  };

  const handleSignUpClick = () => {
    setShowLoginModal(false);
    setShowSignUpModal(true);
  };

  const handleLoginClick = () => {
    setShowSignUpModal(false);
    setShowLoginModal(true);
  };


  const showChatbot = isLoggedIn && location.pathname !== "/";

  if (showLanding) {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

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
          <LoginModal
            isOpen={showLoginModal}
            onClose={handleCloseLoginModal}
            onLogin={handleLogin}
            onSignUpClick={handleSignUpClick}
          />
          <SignUpModal
            isOpen={showSignUpModal}
            onClose={handleCloseSignUpModal}
            onSignUp={handleSignUp}
            onLoginClick={handleLoginClick}
          />
        </div>
      )}
    </div>
  );
};

export default MainLayout;