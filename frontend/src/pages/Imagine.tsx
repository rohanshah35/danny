
import { useState } from "react";
import { ImageIcon, UploadIcon, CheckIcon, SquarePenIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const SAMPLE_DESIGNS = [
  {
    id: 1,
    title: "Modern Kitchen",
    image: "https://images.unsplash.com/photo-1556912167-f556f1f39fdf?q=80&w=2681&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["Kitchen", "Modern", "White"],
  },
  {
    id: 2,
    title: "Cozy Living Room",
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
    tags: ["Living Room", "Cozy", "Neutral"],
  },
  {
    id: 3,
    title: "Minimalist Bathroom",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a",
    tags: ["Bathroom", "Minimalist", "Gray"],
  },
  {
    id: 4,
    title: "Scandinavian Bedroom",
    image: "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e",
    tags: ["Bedroom", "Scandinavian", "Light"],
  },
];

const Imagine = () => {
  const [activeTab, setActiveTab] = useState("gallery");
  const [isHovering, setIsHovering] = useState<number | null>(null);

  return (
    <div className="p-6">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Imagine</h1>
          <p className="text-gray-500 dark:text-gray-400">Visualize your interior design ideas</p>
        </div>

        <Tabs defaultValue="gallery" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="gallery" className="flex items-center gap-2">
              <ImageIcon size={16} />
              <span>Design Gallery</span>
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <UploadIcon size={16} />
              <span>Upload Image</span>
            </TabsTrigger>
            <TabsTrigger value="generate" className="flex items-center gap-2">
              <SquarePenIcon size={16} />
              <span>Generate Ideas</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="gallery" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SAMPLE_DESIGNS.map((design) => (
                <Card 
                  key={design.id} 
                  className="overflow-hidden hover-scale group cursor-pointer"
                  onMouseEnter={() => setIsHovering(design.id)}
                  onMouseLeave={() => setIsHovering(null)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={design.image} 
                      alt={design.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4 transition-opacity duration-300 ${isHovering === design.id ? 'opacity-100' : 'opacity-0'}`}>
                      <div>
                        <h3 className="text-white font-medium">{design.title}</h3>
                        <div className="flex gap-2 mt-2 flex-wrap">
                          {design.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="bg-white/20 text-white">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Oct 2023</span>
                      <Button variant="ghost" size="sm" className="text-orange-500 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20">
                        <CheckIcon size={16} className="mr-1" />
                        Save
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="upload" className="animate-fade-in">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-12 dark:border-gray-700">
                  <UploadIcon size={48} className="text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Upload your image</h3>
                  <p className="text-gray-500 text-center mb-6 max-w-md dark:text-gray-400">
                    Drag and drop your interior photos or floor plans here, or click to browse files
                  </p>
                  <Button className="bg-orange-500 hover:bg-orange-600">
                    Select Files
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="generate" className="animate-fade-in">
            <Card>
              <CardContent className="pt-6">
                <div className="max-w-2xl mx-auto">
                  <h3 className="text-lg font-medium mb-4">Generate design ideas with AI</h3>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
                      Describe your space
                    </label>
                    <textarea 
                      className="w-full min-h-[120px] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700"
                      placeholder="Example: A modern kitchen with white cabinets, wood accents, and a central island..."
                    ></textarea>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200 cursor-pointer dark:bg-orange-900/30 dark:text-orange-400">
                      Modern
                    </Badge>
                    <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200 cursor-pointer dark:bg-orange-900/30 dark:text-orange-400">
                      Scandinavian
                    </Badge>
                    <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200 cursor-pointer dark:bg-orange-900/30 dark:text-orange-400">
                      Industrial
                    </Badge>
                    <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200 cursor-pointer dark:bg-orange-900/30 dark:text-orange-400">
                      Minimalist
                    </Badge>
                    <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200 cursor-pointer dark:bg-orange-900/30 dark:text-orange-400">
                      Rustic
                    </Badge>
                    <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200 cursor-pointer dark:bg-gray-800 dark:text-gray-300">
                      + Add style
                    </Badge>
                  </div>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600">
                    Generate Designs
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Imagine;
