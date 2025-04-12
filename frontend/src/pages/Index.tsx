
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ArrowUpIcon, ArrowDownIcon, CircleCheckIcon, ClockIcon, XCircleIcon, UserIcon } from "lucide-react";
import DashboardCard from "@/components/DashboardCard";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import ProjectAssistant from "@/components/ProjectAssistant";

// Sample data for our charts and cards
const budgetData = [
  { name: "Jan", amount: 8000 },
  { name: "Feb", amount: 6000 },
  { name: "Mar", amount: 9000 },
  { name: "Apr", amount: 7000 },
  { name: "May", amount: 5000 },
  { name: "Jun", amount: 4000 },
  { name: "Jul", amount: 7000 },
  { name: "Aug", amount: 8500 },
  { name: "Sep", amount: 9500 },
];

const projectEvents = [
  { 
    id: 1, 
    title: "Flooring Quote", 
    status: "approved", 
    date: "Today",
    price: "$2,450"
  },
  { 
    id: 2, 
    title: "Kitchen Cabinets", 
    status: "pending", 
    date: "Yesterday",
    price: "$5,800"
  },
  { 
    id: 3, 
    title: "Bathroom Fixtures", 
    status: "rejected", 
    date: "Oct 10",
    price: "$1,200"
  },
  { 
    id: 4, 
    title: "Paint Selection", 
    status: "approved", 
    date: "Oct 8",
    price: "$980"
  },
];

const projectStages = [
  { id: 1, name: "Planning", complete: true },
  { id: 2, name: "Design", complete: true },
  { id: 3, name: "Material Selection", complete: true },
  { id: 4, name: "Permits", complete: false },
  { id: 5, name: "Demolition", complete: false },
  { id: 6, name: "Construction", complete: false },
  { id: 7, name: "Finishing", complete: false },
  { id: 8, name: "Final Inspection", complete: false }
];

const Index = () => {
  const navigate = useNavigate();
  const totalBudget = 100000;
  const spentAmount = 42500;
  const percentSpent = (spentAmount / totalBudget) * 100;
  const completedStages = projectStages.filter(stage => stage.complete).length;
  const projectProgress = (completedStages / projectStages.length) * 100;
  
  // Placeholder contractor information
  const contractorName = "Michael Johnson";
  const contractorCompany = "Johnson Renovations";

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CircleCheckIcon className="h-5 w-5 text-green-500" />;
      case "pending":
        return <ClockIcon className="h-5 w-5 text-amber-500" />;
      case "rejected":
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Approved</Badge>;
      case "pending":
        return <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">Pending</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">Rejected</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400">Welcome back to your project</p>
          </div>
          <div className="flex items-center gap-2 bg-orange-50 dark:bg-orange-900/10 rounded-lg px-3 py-2 border border-orange-100 dark:border-orange-900/20">
            <UserIcon className="h-4 w-4 text-orange-500" />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Contractor: {contractorName}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">{contractorCompany}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DashboardCard
            title="Balance & Spend"
            actionLink="/budget"
            className="md:col-span-1"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Budget</p>
                  <p className="text-2xl font-bold">${totalBudget.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Spent</p>
                  <p className="text-2xl font-bold">${spentAmount.toLocaleString()}</p>
                </div>
              </div>
              <Progress value={percentSpent} className="h-2 bg-gray-200 dark:bg-gray-700" />
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={budgetData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="amount"
                      stroke="#f97316"
                      strokeWidth={2}
                      dot={{ strokeWidth: 2, r: 2 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 dark:text-gray-400">Remaining: ${(totalBudget - spentAmount).toLocaleString()}</span>
                <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
                  <ArrowUpIcon className="h-4 w-4" />
                  <span>12.5%</span>
                  <span className="text-gray-500 dark:text-gray-400">vs baseline</span>
                </span>
              </div>
            </div>
          </DashboardCard>

          <DashboardCard
            title="Project Assistant"
            className="md:col-span-1"
          >
            <ProjectAssistant />
          </DashboardCard>

          <DashboardCard
            title="Project Progress"
            actionLink="/timeline"
            className="md:col-span-1"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="font-medium">Overall Progress</p>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{Math.round(projectProgress)}% Complete</p>
              </div>
              <Progress value={projectProgress} className="h-2 bg-gray-200 dark:bg-gray-700" />
              
              <div className="space-y-3 mt-4">
                {projectStages.map((stage) => (
                  <div key={stage.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "w-4 h-4 rounded-full",
                        stage.complete ? "bg-green-500" : "bg-gray-300 dark:bg-gray-600"
                      )}></div>
                      <span className={cn(
                        "text-sm",
                        stage.complete ? "text-gray-900 dark:text-gray-100" : "text-gray-500 dark:text-gray-400"
                      )}>{stage.name}</span>
                    </div>
                    {stage.complete && <CircleCheckIcon className="h-4 w-4 text-green-500" />}
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between items-center text-sm mt-2">
                <span className="text-gray-500 dark:text-gray-400">Start: Oct 1, 2023</span>
                <span className="text-gray-500 dark:text-gray-400">Projected End: Feb 15, 2024</span>
              </div>
            </div>
          </DashboardCard>

          <DashboardCard
            title="Project Events"
            className="md:col-span-1"
          >
            <div className="space-y-4">
              <div className="space-y-3">
                {projectEvents.slice(0, 3).map((event) => (
                  <div
                    key={event.id}
                    className="flex items-start space-x-4 p-4 bg-white rounded-lg border border-gray-100 hover:border-orange-200 transition-colors dark:bg-gray-800 dark:border-gray-700 dark:hover:border-orange-900/50"
                  >
                    <div className="flex-shrink-0 mt-1">
                      {getStatusIcon(event.status)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">{event.title}</h4>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{event.date}</span>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <div>{getStatusBadge(event.status)}</div>
                        <span className="font-medium">{event.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full py-2 text-sm text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300">
                View all events
              </button>
            </div>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
};

export default Index;
