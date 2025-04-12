
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (userType: string) => void;
}

const LoginModal = ({ isOpen, onClose, onLogin }: LoginModalProps) => {
  const [activeTab, setActiveTab] = useState("homeowner");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email && password) {
      onLogin(activeTab);
      onClose();
      setEmail("");
      setPassword("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-semibold">Sign in to your account</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="homeowner" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="homeowner">Homeowner</TabsTrigger>
            <TabsTrigger value="contractor">Contractor</TabsTrigger>
          </TabsList>
          
          <TabsContent value="homeowner" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="homeowner-email">Email</Label>
              <Input 
                id="homeowner-email" 
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="homeowner-password">Password</Label>
                <a href="#" className="text-sm text-orange-500 hover:text-orange-600">
                  Forgot password?
                </a>
              </div>
              <Input 
                id="homeowner-password" 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="contractor" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="contractor-email">Email</Label>
              <Input 
                id="contractor-email" 
                placeholder="your.company@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="contractor-password">Password</Label>
                <a href="#" className="text-sm text-orange-500 hover:text-orange-600">
                  Forgot password?
                </a>
              </div>
              <Input 
                id="contractor-password" 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </TabsContent>
        </Tabs>
        
        <Button 
          onClick={handleLogin} 
          className="w-full mt-4 bg-orange-500 hover:bg-orange-600"
        >
          Sign In
        </Button>
        
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Don't have an account? <a href="#" className="text-orange-500 hover:underline">Sign up</a>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
