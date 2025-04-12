
import { Calendar, Clock, FileCheck, FileWarning } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface TimelineEvent {
  id: number;
  title: string;
  date: string;
  status: "completed" | "in-progress" | "upcoming" | "delayed";
  description: string;
  category: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    id: 1,
    title: "Project Kickoff",
    date: "Oct 1, 2023",
    status: "completed",
    description: "Initial consultation and project scope definition",
    category: "Planning"
  },
  {
    id: 2,
    title: "Design Concept Approval",
    date: "Oct 15, 2023",
    status: "completed",
    description: "Client approved initial design concepts for kitchen and living room",
    category: "Design"
  },
  {
    id: 3,
    title: "Material Selection",
    date: "Oct 20, 2023",
    status: "in-progress",
    description: "Selecting flooring, countertops, and cabinet finishes",
    category: "Materials"
  },
  {
    id: 4,
    title: "Contractor Bidding",
    date: "Nov 5, 2023",
    status: "upcoming",
    description: "Collecting and evaluating contractor bids",
    category: "Contracts"
  },
  {
    id: 5,
    title: "Permit Application",
    date: "Nov 15, 2023",
    status: "delayed",
    description: "Applying for construction and renovation permits",
    category: "Legal"
  },
  {
    id: 6,
    title: "Construction Start",
    date: "Dec 1, 2023",
    status: "upcoming",
    description: "Beginning of demolition and construction work",
    category: "Construction"
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "completed":
      return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Completed</Badge>;
    case "in-progress":
      return <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400">In Progress</Badge>;
    case "upcoming":
      return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">Upcoming</Badge>;
    case "delayed":
      return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">Delayed</Badge>;
    default:
      return null;
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center dark:bg-green-900/30">
        <FileCheck className="h-4 w-4 text-green-600 dark:text-green-400" />
      </div>;
    case "in-progress":
      return <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center dark:bg-orange-900/30">
        <Clock className="h-4 w-4 text-orange-600 dark:text-orange-400" />
      </div>;
    case "upcoming":
      return <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center dark:bg-blue-900/30">
        <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
      </div>;
    case "delayed":
      return <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center dark:bg-red-900/30">
        <FileWarning className="h-4 w-4 text-red-600 dark:text-red-400" />
      </div>;
    default:
      return null;
  }
};

const Timeline = () => {
  return (
    <div className="p-6">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Timeline</h1>
          <p className="text-gray-500 dark:text-gray-400">Track your project milestones and schedule</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Project Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Project</h3>
                <p className="font-medium">Home Renovation 2023</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Start Date</h3>
                <p className="font-medium">October 1, 2023</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Expected Completion</h3>
                <p className="font-medium">February 15, 2024</p>
              </div>
              <Separator />
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</h3>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <span className="font-medium">In Progress (30%)</span>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Upcoming Milestone</h3>
                <p className="font-medium">Contractor Bidding (Nov 5)</p>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Project Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative pl-8 space-y-6">
                {timelineEvents.map((event, index) => (
                  <div key={event.id} className="relative">
                    {/* Timeline line */}
                    {index < timelineEvents.length - 1 && (
                      <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-800" style={{ transform: "translateX(-50%)" }}></div>
                    )}
                    
                    {/* Event content */}
                    <div className="flex items-start">
                      <div className="absolute left-0 top-0">{getStatusIcon(event.status)}</div>
                      
                      <div className="bg-white p-4 rounded-lg border border-gray-100 ml-4 w-full dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">{event.title}</h3>
                          {getStatusBadge(event.status)}
                        </div>
                        <p className="text-sm text-gray-500 mb-2 dark:text-gray-400">{event.date}</p>
                        <p className="text-sm">{event.description}</p>
                        <div className="mt-2">
                          <Badge variant="outline" className="bg-gray-50 dark:bg-gray-900">{event.category}</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
