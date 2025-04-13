
import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { 
  HomeIcon, 
  ImageIcon, 
  CalendarIcon, 
  WalletIcon,
  MessagesSquareIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  LogOutIcon,
  UserIcon,
  SettingsIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  path: string;
  isCollapsed: boolean;
}

interface SidebarProps {
  onLogout: () => void;
  userType: string | null;
}

const SidebarItem = ({ icon: Icon, label, path, isCollapsed }: SidebarItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === path;
  const navigate = useNavigate();

  return (
    <Link
      to={path}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200 hover:bg-orange-100 dark:hover:bg-orange-900/20",
        isActive ? "bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-500" : "text-gray-600 dark:text-gray-400"
      )}
    >
      <Icon className={cn("h-5 w-5", isActive && "text-orange-500")} />
      {!isCollapsed && <span>{label}</span>}
    </Link>
  );
};

const Sidebar = ({ onLogout, userType }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const sidebarItems = [
    { icon: HomeIcon, label: "Overview", path: "/overview" },
    { icon: ImageIcon, label: "Imagine", path: "/imagine" },
    { icon: CalendarIcon, label: "Timeline", path: "/timeline" },
    { icon: WalletIcon, label: "Budget", path: "/budget" },
    { icon: MessagesSquareIcon, label: "Danny", path: "/danny" },
    { icon: SettingsIcon, label: "Settings", path: "/settings" },
  ];

  return (
    <div 
      className={cn(
        "flex flex-col h-screen bg-white border-r border-gray-200 transition-all duration-300 dark:bg-gray-900 dark:border-gray-800",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
        {!isCollapsed && (
          <h1 className="text-xl font-semibold text-orange-500">Danny.ai</h1>
        )}
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <ChevronRightIcon size={20} /> : <ChevronLeftIcon size={20} />}
        </button>
      </div>
      
      <div className="flex-1 py-6 px-3 space-y-2 overflow-y-auto">
        {sidebarItems.map((item) => (
          <SidebarItem
            key={item.path}
            icon={item.icon}
            label={item.label}
            path={item.path}
            isCollapsed={isCollapsed}
          />
        ))}
      </div>

      <div className="mt-auto border-t border-gray-200 dark:border-gray-800 p-3">
        <div className={cn(
          "flex items-center gap-3 p-2 rounded-lg",
          isCollapsed ? "justify-center" : "justify-between"
        )}>
          <div className={cn(
            "flex items-center gap-3",
            isCollapsed && "justify-center"
          )}>
            <div className="bg-orange-100 dark:bg-orange-900/20 w-8 h-8 rounded-full flex items-center justify-center">
              <UserIcon className="h-4 w-4 text-orange-500" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="text-sm font-medium">{userType === "customer" ? "Customer" : "Contractor"}</span>
                <span className="text-xs text-gray-500">Account</span>
              </div>
            )}
          </div>

          {!isCollapsed && (
            <button
              onClick={onLogout}
              className="text-gray-500 hover:text-orange-500 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Log out"
            >
              <LogOutIcon size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
