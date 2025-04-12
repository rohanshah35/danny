import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Sample product data
const products = [
  {
    id: 1,
    name: "Modern Kitchen Faucet",
    price: 189.99,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=120&ixid=MnwxfDB8MXxhbGx8fHx8fHx8fHwxNjI0ODgzNjcw&ixlib=rb-1.2.1&q=80&w=200",
    supplier: "Modern Fixtures Inc.",
    tags: ["kitchen", "fixtures", "modern"],
  },
  {
    id: 2,
    name: "Hardwood Flooring - Oak",
    price: 6.99,
    unit: "sq ft",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1622398925373-3f91b1e275f5?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=120&ixid=MnwxfDB8MXxhbGx8fHx8fHx8fHwxNjI0ODgzNzQ4&ixlib=rb-1.2.1&q=80&w=200",
    supplier: "Flooring Experts",
    tags: ["flooring", "wood", "oak"],
  },
  {
    id: 3,
    name: "Pendant Light Fixture",
    price: 129.0,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1540932239986-30128078f3c5?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=120&ixid=MnwxfDB8MXxhbGx8fHx8fHx8fHwxNjI0ODgzODYz&ixlib=rb-1.2.1&q=80&w=200",
    supplier: "Lighting Universe",
    tags: ["lighting", "pendant", "modern"],
  },
  {
    id: 4,
    name: "Marble Countertop",
    price: 75.0,
    unit: "sq ft",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1600607686527-6fb886090705?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=120&ixid=MnwxfDB8MXxhbGx8fHx8fHx8fHwxNjI0ODgzOTQ5&ixlib=rb-1.2.1&q=80&w=200",
    supplier: "Stone Masters",
    tags: ["countertop", "marble", "kitchen"],
  },
];

const Danny = () => {
  const [activeTab, setActiveTab] = useState("search");
  const [searchQuery, setSearchQuery] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [waitTime, setWaitTime] = useState<number | null>(null);

  // When the button is clicked, generate a random wait time (5 to 20 minutes)
  const handleDeployClick = () => {
    const randomTime = Math.floor(Math.random() * 16) + 5; // Generates a number between 5 and 20
    setWaitTime(randomTime);
    setShowPopup(true);
  };

  // Function to close the popup
  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="p-6 relative">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Danny</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Your smart sourcing agent
          </p>
        </div>

        <Tabs defaultValue="search" className="w-full" onValueChange={setActiveTab}>
          {/* Wrap TabsList and the Deploy Voice Agent button in a flex container */}
          <div className="flex justify-between items-center mb-6">
            <TabsList>
              <TabsTrigger value="search" className="flex items-center gap-2">
                <SearchIcon size={16} />
                <span>Search</span>
              </TabsTrigger>
              <TabsTrigger value="selected" className="flex items-center gap-2">
                <ShoppingCartIcon size={16} />
                <span>Selected Items</span>
              </TabsTrigger>
              <TabsTrigger value="saved" className="flex items-center gap-2">
                <HeartIcon size={16} />
                <span>Saved</span>
              </TabsTrigger>
            </TabsList>

            {/* Orange Deploy Voice Agent Button */}
            <Button
              className="bg-orange-500 hover:bg-orange-600 text-white"
              onClick={handleDeployClick}
            >
              Deploy Voice Agent
            </Button>
          </div>

          {/* Search Tab */}
          <TabsContent value="search" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-3">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <SearchIcon
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={18}
                    />
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
                      <HeartIcon
                        size={18}
                        className="text-gray-400 hover:text-red-500 cursor-pointer"
                      />
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-semibold">
                        ${product.price.toFixed(2)}
                        {product.unit ? `/${product.unit}` : ""}
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
                        <Badge
                          key={tag}
                          variant="outline"
                          className="bg-gray-50 dark:bg-gray-900"
                        >
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

          {/* Selected Items Tab */}
          <TabsContent value="selected" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle>Selected Items</CardTitle>
                <CardDescription>
                  Products and materials you've selected for your project
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Example selected item card */}
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
                        <h3 className="font-medium">
                          Calacatta Quartz Countertop
                        </h3>
                        <div className="flex items-center text-sm">
                          <span className="text-amber-500">★</span>
                          <span className="ml-1">4.9</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        $75.00/sq ft · Stone Masters
                      </p>
                      <div className="flex items-center mt-2">
                        <Badge className="bg-green-100 text-green-800 mr-2 dark:bg-green-900/30 dark:text-green-400">
                          <CheckCircleIcon size={12} className="mr-1" />
                          In Budget
                        </Badge>
                        <Badge variant="outline" className="mr-2">
                          countertop
                        </Badge>
                        <Badge variant="outline">kitchen</Badge>
                      </div>
                    </div>
                    <div className="ml-4 flex flex-col space-y-2">
                      <Button variant="outline" size="sm">
                        Remove
                      </Button>
                      <Button variant="outline" size="sm">
                        Details
                      </Button>
                    </div>
                  </div>
                  {/* Additional selected item cards can be added here */}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Saved Tab */}
          <TabsContent value="saved" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle>Saved</CardTitle>
                <CardDescription>
                  Products and materials you've saved for your project
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Example saved item card */}
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
                        <h3 className="font-medium">
                          Calacatta Quartz Countertop
                        </h3>
                        <div className="flex items-center text-sm">
                          <span className="text-amber-500">★</span>
                          <span className="ml-1">4.9</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        $75.00/sq ft · Stone Masters
                      </p>
                      <div className="flex items-center mt-2">
                        <Badge className="bg-green-100 text-green-800 mr-2 dark:bg-green-900/30 dark:text-green-400">
                          <CheckCircleIcon size={12} className="mr-1" />
                          In Budget
                        </Badge>
                        <Badge variant="outline" className="mr-2">
                          countertop
                        </Badge>
                        <Badge variant="outline">kitchen</Badge>
                      </div>
                    </div>
                    <div className="ml-4 flex flex-col space-y-2">
                      <Button variant="outline" size="sm">
                        Remove
                      </Button>
                      <Button variant="outline" size="sm">
                        Details
                      </Button>
                    </div>
                  </div>
                  {/* Additional saved item cards can be added here */}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Popup Overlay */}
      {showPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={closePopup}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h1 className="text-xl font-bold mb-9 text-orange-500">
              Danny is on the job!
            </h1>
            <h2 className="text-sm font-bold mb-4 uppercase">
              Estimated Time: {waitTime} minutes
            </h2>
            <p className="text-sm mb-9">
              Check your email after the estimated time to find quotes from
              retailers of selected items.
            </p>
            <Button
              onClick={closePopup}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6"
            >
              OK
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Danny;
