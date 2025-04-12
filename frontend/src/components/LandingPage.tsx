
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface LandingPageProps {
  onSelectUserType: (userType: string) => void;
}

const LandingPage = ({ onSelectUserType }: LandingPageProps) => {
  const [activeTab, setActiveTab] = useState("homeowner");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    if (email && password) {
      onSelectUserType(activeTab);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 p-4">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-orange-500 mb-2">Danny.ai</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Smart home renovation platform
        </p>
      </div>
      
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800 p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Sign in to your account</h2>
        
        <Tabs defaultValue="homeowner" className="w-full mb-6" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="homeowner">Homeowner</TabsTrigger>
            <TabsTrigger value="contractor">Contractor</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <Input 
              id="email"
              type="email" 
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <a href="#" className="text-sm text-orange-500 hover:text-orange-600">
                Forgot password?
              </a>
            </div>
            <Input 
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <Button 
            onClick={handleSignIn}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md"
          >
            Sign In
          </Button>
          
          <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
            Don't have an account? <a href="#" className="text-orange-500 hover:text-orange-600">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
