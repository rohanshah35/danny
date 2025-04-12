
import { useState } from "react";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowDownIcon, ArrowUpIcon, DollarSignIcon, PlusCircleIcon } from "lucide-react";

// Sample data
const COLORS = ["#f97316", "#0ea5e9", "#10b981", "#8b5cf6", "#ec4899"];

const pieData = [
  { name: "Kitchen", value: 25000 },
  { name: "Bathroom", value: 15000 },
  { name: "Living Room", value: 8500 },
  { name: "Bedroom", value: 6000 },
  { name: "Other", value: 4000 }
];

const lineData = [
  { month: "Jan", actual: 0, projected: 10000 },
  { month: "Feb", actual: 0, projected: 25000 },
  { month: "Mar", actual: 0, projected: 40000 },
  { month: "Apr", actual: 0, projected: 55000 },
  { month: "May", actual: 0, projected: 70000 },
  { month: "Jun", actual: 0, projected: 85000 },
  { month: "Jul", actual: 0, projected: 100000 },
  { month: "Aug", actual: 12000, projected: 0 },
  { month: "Sep", actual: 30000, projected: 0 },
  { month: "Oct", actual: 42500, projected: 0 },
  { month: "Nov", actual: 0, projected: 65000 },
  { month: "Dec", actual: 0, projected: 80000 },
];

const transactionsData = [
  {
    id: 1,
    date: "Oct 10, 2023",
    description: "Kitchen Cabinets - Deposit",
    category: "Kitchen",
    amount: 2500,
    type: "expense"
  },
  {
    id: 2,
    date: "Oct 8, 2023",
    description: "Paint and Supplies",
    category: "Living Room",
    amount: 860,
    type: "expense"
  },
  {
    id: 3,
    date: "Oct 5, 2023",
    description: "Flooring Materials",
    category: "Living Room",
    amount: 3200,
    type: "expense"
  },
  {
    id: 4,
    date: "Oct 1, 2023",
    description: "Budget Increase",
    category: "Funding",
    amount: 10000,
    type: "income"
  },
  {
    id: 5,
    date: "Sep 28, 2023",
    description: "Bathroom Fixtures",
    category: "Bathroom",
    amount: 1450,
    type: "expense"
  },
];

const Budget = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  const totalBudget = 100000;
  const spentAmount = 42500;
  const remainingAmount = totalBudget - spentAmount;
  const percentSpent = (spentAmount / totalBudget) * 100;

  return (
    <div className="p-6">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Budget</h1>
          <p className="text-gray-500 dark:text-gray-400">Track your project expenses</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-sm font-medium text-gray-500 mb-1 dark:text-gray-400">Total Budget</h3>
                <p className="text-3xl font-bold">${totalBudget.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-sm font-medium text-gray-500 mb-1 dark:text-gray-400">Spent</h3>
                <p className="text-3xl font-bold">${spentAmount.toLocaleString()}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{percentSpent.toFixed(1)}% of budget</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-sm font-medium text-gray-500 mb-1 dark:text-gray-400">Remaining</h3>
                <p className="text-3xl font-bold">${remainingAmount.toLocaleString()}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{(100 - percentSpent).toFixed(1)}% of budget</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Budget Allocation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Spending Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={lineData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} />
                        <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `$${value / 1000}k`} />
                        <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="actual" 
                          stroke="#f97316" 
                          strokeWidth={2}
                          dot={{ strokeWidth: 2, r: 2 }}
                          activeDot={{ r: 6 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="projected" 
                          stroke="#94a3b8" 
                          strokeWidth={2}
                          strokeDasharray="5 5"
                          dot={{ strokeWidth: 2, r: 2 }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="breakdown" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle>Budget Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category</TableHead>
                      <TableHead>Budget</TableHead>
                      <TableHead>Spent</TableHead>
                      <TableHead>Remaining</TableHead>
                      <TableHead>Progress</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Kitchen</TableCell>
                      <TableCell>$25,000</TableCell>
                      <TableCell>$18,500</TableCell>
                      <TableCell>$6,500</TableCell>
                      <TableCell>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700">
                          <div className="h-full bg-orange-500 rounded-full" style={{ width: "74%" }}></div>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">74%</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Bathroom</TableCell>
                      <TableCell>$15,000</TableCell>
                      <TableCell>$9,800</TableCell>
                      <TableCell>$5,200</TableCell>
                      <TableCell>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700">
                          <div className="h-full bg-orange-500 rounded-full" style={{ width: "65%" }}></div>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">65%</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Living Room</TableCell>
                      <TableCell>$8,500</TableCell>
                      <TableCell>$6,200</TableCell>
                      <TableCell>$2,300</TableCell>
                      <TableCell>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700">
                          <div className="h-full bg-orange-500 rounded-full" style={{ width: "73%" }}></div>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">73%</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Bedroom</TableCell>
                      <TableCell>$6,000</TableCell>
                      <TableCell>$3,400</TableCell>
                      <TableCell>$2,600</TableCell>
                      <TableCell>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700">
                          <div className="h-full bg-orange-500 rounded-full" style={{ width: "57%" }}></div>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">57%</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Other</TableCell>
                      <TableCell>$4,000</TableCell>
                      <TableCell>$2,100</TableCell>
                      <TableCell>$1,900</TableCell>
                      <TableCell>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700">
                          <div className="h-full bg-orange-500 rounded-full" style={{ width: "53%" }}></div>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">53%</span>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="transactions" className="animate-fade-in">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Transactions</CardTitle>
                <Button className="bg-orange-500 hover:bg-orange-600">
                  <PlusCircleIcon className="h-4 w-4 mr-2" />
                  Add Transaction
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Type</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactionsData.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell className="font-medium">{transaction.description}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{transaction.category}</Badge>
                        </TableCell>
                        <TableCell className="font-medium">
                          ${transaction.amount.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          {transaction.type === "expense" ? (
                            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/30">
                              <ArrowDownIcon className="h-3 w-3 mr-1" />
                              Expense
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900/30">
                              <ArrowUpIcon className="h-3 w-3 mr-1" />
                              Income
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Budget;
