import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignUp: (userType: string) => void;
  onLoginClick: () => void;
}

const SignUpModal = ({ isOpen, onClose, onSignUp, onLoginClick }: SignUpModalProps) => {
  const [activeTab, setActiveTab] = useState("homeowner");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const handleSignUp = () => {
    if (email && password && confirmPassword && fullName && password === confirmPassword) {
      onSignUp(activeTab);
      onClose();
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setFullName("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-semibold">Create your account</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="homeowner" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="homeowner">Homeowner</TabsTrigger>
            <TabsTrigger value="contractor">Contractor</TabsTrigger>
          </TabsList>
          
          <TabsContent value="homeowner" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="homeowner-name">Full Name</Label>
              <Input 
                id="homeowner-name" 
                placeholder="Your Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="homeowner-email">Email</Label>
              <Input 
                id="homeowner-email" 
                placeholder="your.email@example.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="homeowner-password">Password</Label>
              <Input 
                id="homeowner-password" 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="homeowner-confirm-password">Confirm Password</Label>
              <Input 
                id="homeowner-confirm-password" 
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="contractor" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="contractor-name">Full Name</Label>
              <Input 
                id="contractor-name" 
                placeholder="Your Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contractor-email">Email</Label>
              <Input 
                id="contractor-email" 
                placeholder="your.company@example.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contractor-password">Password</Label>
              <Input 
                id="contractor-password" 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contractor-confirm-password">Confirm Password</Label>
              <Input 
                id="contractor-confirm-password" 
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </TabsContent>
        </Tabs>
        
        <Button 
          onClick={handleSignUp} 
          className="w-full mt-4 bg-orange-500 hover:bg-orange-600"
        >
          Sign Up
        </Button>
        
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); onLoginClick(); }} className="text-orange-500 hover:underline">Sign in</a>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignUpModal;