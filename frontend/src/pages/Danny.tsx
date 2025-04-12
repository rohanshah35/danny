
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  SearchIcon, 
  SendIcon, 
  FilterIcon, 
  ShoppingCartIcon, 
  TagIcon, 
  HeartIcon, 
  CheckCircleIcon,
  MessageSquareTextIcon
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Sample data
const products = [
  {
    id: 1,
    name: "Modern Kitchen Faucet",
    price: 189.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=120&ixid=MnwxfDB8MXxhbGx8fHx8fHx8fHwxNjI0ODgzNjcw&ixlib=rb-1.2.1&q=80&w=200",
    supplier: "Modern Fixtures Inc.",
    tags: ["kitchen", "fixtures", "modern"]
  },
  {
    id: 2,
    name: "Hardwood Flooring - Oak",
    price: 6.99,
    unit: "sq ft",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1622398925373-3f91b1e275f5?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=120&ixid=MnwxfDB8MXxhbGx8fHx8fHx8fHwxNjI0ODgzNzQ4&ixlib=rb-1.2.1&q=80&w=200",
    supplier: "Flooring Experts",
    tags: ["flooring", "wood", "oak"]
  },
  {
    id: 3,
    name: "Pendant Light Fixture",
    price: 129.00,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=120&ixid=MnwxfDB8MXxhbGx8fHx8fHx8fHwxNjI0ODgzODYz&ixlib=rb-1.2.1&q=80&w=200",
    supplier: "Lighting Universe",
    tags: ["lighting", "pendant", "modern"]
  },
  {
    id: 4,
    name: "Marble Countertop",
    price: 75.00,
    unit: "sq ft",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=120&ixid=MnwxfDB8MXxhbGx8fHx8fHx8fHwxNjI0ODgzOTQ5&ixlib=rb-1.2.1&q=80&w=200",
    supplier: "Stone Masters",
    tags: ["countertop", "marble", "kitchen"]
  }
];

const conversations = [
  {
    id: 1,
    title: "Kitchen Renovation Materials",
    lastMessage: "I've found several options for the quartz countertops you were looking for",
    timestamp: "Today, 2:34 PM",
    unread: true
  },
  {
    id: 2,
    title: "Bathroom Fixtures",
    lastMessage: "Based on your style preferences, here are some shower fixtures that would match well",
    timestamp: "Yesterday",
    unread: false
  },
  {
    id: 3,
    title: "Living Room Flooring",
    lastMessage: "I've compared the oak and maple options. Here's what I found",
    timestamp: "Oct 10",
    unread: false
  }
];

const Danny = () => {
  const [activeTab, setActiveTab] = useState("search");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="p-6">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Danny</h1>
          <p className="text-gray-500 dark:text-gray-400">Your smart sourcing agent</p>
        </div>

        <Tabs defaultValue="search" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="search" className="flex items-center gap-2">
              <SearchIcon size={16} />
              <span>Search</span>
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageSquareTextIcon size={16} />
              <span>Conversations</span>
            </TabsTrigger>
            <TabsTrigger value="saved" className="flex items-center gap-2">
              <HeartIcon size={16} />
              <span>Saved Items</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="search" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-3">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      placeholder="Search for materials, fixtures, furniture..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" className="flex items-center gap-2">
                    <FilterIcon size={16} />
                    <span>Filters</span>
                  </Button>
                </div>
              </div>
              
              {products.map((product) => (
                <Card key={product.id} className="overflow-hidden hover-scale">
                  <div className="h-[120px] overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{product.name}</h3>
                      <HeartIcon size={18} className="text-gray-400 hover:text-red-500 cursor-pointer" />
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-semibold">
                        ${product.price.toFixed(2)}{product.unit ? `/${product.unit}` : ""}
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="text-amber-500">★</span>
                        <span className="ml-1">{product.rating}</span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 mb-3 dark:text-gray-400">
                      From: {product.supplier}
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {product.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="bg-gray-50 dark:bg-gray-900">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <ShoppingCartIcon size={16} className="mr-1" />
                        Add
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <TagIcon size={16} className="mr-1" />
                        Compare
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="chat" className="animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-1 overflow-hidden">
                <CardHeader>
                  <CardTitle>Conversations</CardTitle>
                  <CardDescription>Chat with Danny about your project needs</CardDescription>
                </CardHeader>
                <div className="px-6 pb-2">
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700"
                  />
                </div>
                <CardContent className="p-0">
                  <div className="space-y-1">
                    {conversations.map((convo) => (
                      <div key={convo.id} className="px-4 py-3 hover:bg-gray-50 cursor-pointer dark:hover:bg-gray-800">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-medium flex items-center">
                            {convo.title}
                            {convo.unread && (
                              <span className="ml-2 w-2 h-2 bg-orange-500 rounded-full"></span>
                            )}
                          </h3>
                          <span className="text-xs text-gray-500 dark:text-gray-400">{convo.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-600 truncate dark:text-gray-400">
                          {convo.lastMessage}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="lg:col-span-2 min-h-[600px] flex flex-col">
                <CardHeader className="border-b">
                  <CardTitle>Kitchen Renovation Materials</CardTitle>
                  <CardDescription>
                    Conversation started on October 10, 2023
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col overflow-y-auto p-0">
                  <div className="flex-1 p-4 space-y-4">
                    <div className="flex justify-start">
                      <div className="bg-gray-100 p-3 rounded-lg max-w-[80%] dark:bg-gray-800">
                        <p>Hi there! I'm Danny, your sourcing assistant. How can I help with your kitchen renovation today?</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <div className="bg-orange-100 p-3 rounded-lg max-w-[80%] dark:bg-orange-900/20">
                        <p>I'm looking for quartz countertops that would go well with white cabinets and a gray backsplash.</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-start">
                      <div className="bg-gray-100 p-3 rounded-lg max-w-[80%] space-y-2 dark:bg-gray-800">
                        <p>Great choice! I've found several options that would work well with your white cabinets and gray backsplash.</p>
                        <p>Here are some recommendations based on your style preferences:</p>
                        <div className="grid grid-cols-2 gap-2 pt-2">
                          <div className="space-y-1">
                            <img 
                              src="https://images.unsplash.com/photo-1564540586988-aa4e53c3d799?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=80&ixlib=rb-1.2.1&q=80&w=120" 
                              alt="Calacatta Quartz"
                              className="rounded"
                            />
                            <p className="text-xs font-medium">Calacatta Quartz</p>
                            <p className="text-xs">$75/sq ft</p>
                          </div>
                          <div className="space-y-1">
                            <img 
                              src="https://images.unsplash.com/photo-1588854337115-1c67d9247e4d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=80&ixlib=rb-1.2.1&q=80&w=120" 
                              alt="Carrara Veined"
                              className="rounded"
                            />
                            <p className="text-xs font-medium">Carrara Veined</p>
                            <p className="text-xs">$68/sq ft</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <div className="bg-orange-100 p-3 rounded-lg max-w-[80%] dark:bg-orange-900/20">
                        <p>I like the Calacatta Quartz. Where can I get samples and what's the lead time?</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-start">
                      <div className="bg-gray-100 p-3 rounded-lg max-w-[80%] dark:bg-gray-800">
                        <p>I can arrange for samples to be sent to your address. The current lead time for Calacatta Quartz is approximately 2-3 weeks for fabrication after measurements. Would you like me to connect you with our recommended supplier?</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border-t border-gray-200 mt-auto dark:border-gray-700">
                    <div className="flex">
                      <input 
                        type="text" 
                        placeholder="Type your message..." 
                        className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-orange-500 dark:bg-gray-800 dark:border-gray-700"
                      />
                      <Button className="rounded-r-lg bg-orange-500 hover:bg-orange-600">
                        <SendIcon size={16} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="saved" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle>Saved Items</CardTitle>
                <CardDescription>Products and materials you've saved for your project</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center p-4 border border-gray-100 rounded-lg dark:border-gray-800">
                    <div className="w-16 h-16 overflow-hidden rounded">
                      <img 
                        src="https://images.unsplash.com/photo-1564540586988-aa4e53c3d799?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=80&ixlib=rb-1.2.1&q=80&w=80" 
                        alt="Calacatta Quartz"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 ml-4">
                      <div className="flex justify-between">
                        <h3 className="font-medium">Calacatta Quartz Countertop</h3>
                        <div className="flex items-center text-sm">
                          <span className="text-amber-500">★</span>
                          <span className="ml-1">4.9</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">$75.00/sq ft · Stone Masters</p>
                      <div className="flex items-center mt-2">
                        <Badge className="bg-green-100 text-green-800 mr-2 dark:bg-green-900/30 dark:text-green-400">
                          <CheckCircleIcon size={12} className="mr-1" />
                          In Budget
                        </Badge>
                        <Badge variant="outline" className="mr-2">countertop</Badge>
                        <Badge variant="outline">kitchen</Badge>
                      </div>
                    </div>
                    <div className="ml-4 flex flex-col space-y-2">
                      <Button variant="outline" size="sm">Remove</Button>
                      <Button variant="outline" size="sm">Details</Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 border border-gray-100 rounded-lg dark:border-gray-800">
                    <div className="w-16 h-16 overflow-hidden rounded">
                      <img 
                        src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=80&ixlib=rb-1.2.1&q=80&w=80" 
                        alt="Modern Kitchen Faucet"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 ml-4">
                      <div className="flex justify-between">
                        <h3 className="font-medium">Modern Kitchen Faucet</h3>
                        <div className="flex items-center text-sm">
                          <span className="text-amber-500">★</span>
                          <span className="ml-1">4.8</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">$189.99 · Modern Fixtures Inc.</p>
                      <div className="flex items-center mt-2">
                        <Badge className="bg-green-100 text-green-800 mr-2 dark:bg-green-900/30 dark:text-green-400">
                          <CheckCircleIcon size={12} className="mr-1" />
                          In Budget
                        </Badge>
                        <Badge variant="outline" className="mr-2">fixtures</Badge>
                        <Badge variant="outline">kitchen</Badge>
                      </div>
                    </div>
                    <div className="ml-4 flex flex-col space-y-2">
                      <Button variant="outline" size="sm">Remove</Button>
                      <Button variant="outline" size="sm">Details</Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 border border-gray-100 rounded-lg dark:border-gray-800">
                    <div className="w-16 h-16 overflow-hidden rounded">
                      <img 
                        src="https://images.unsplash.com/photo-1540932239986-30128078f3c5?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=80&ixlib=rb-1.2.1&q=80&w=80" 
                        alt="Pendant Light Fixture"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 ml-4">
                      <div className="flex justify-between">
                        <h3 className="font-medium">Pendant Light Fixture</h3>
                        <div className="flex items-center text-sm">
                          <span className="text-amber-500">★</span>
                          <span className="ml-1">4.5</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">$129.00 · Lighting Universe</p>
                      <div className="flex items-center mt-2">
                        <Badge className="bg-green-100 text-green-800 mr-2 dark:bg-green-900/30 dark:text-green-400">
                          <CheckCircleIcon size={12} className="mr-1" />
                          In Budget
                        </Badge>
                        <Badge variant="outline" className="mr-2">lighting</Badge>
                        <Badge variant="outline">modern</Badge>
                      </div>
                    </div>
                    <div className="ml-4 flex flex-col space-y-2">
                      <Button variant="outline" size="sm">Remove</Button>
                      <Button variant="outline" size="sm">Details</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Danny;
