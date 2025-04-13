import { useState, useRef } from "react";
import { ImageIcon, UploadIcon, CheckIcon, SquarePenIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const SAMPLE_DESIGNS = [
  {
    id: 1,
    title: "Modern Kitchen",
    image:
      "https://images.unsplash.com/photo-1556912167-f556f1f39fdf?q=80&w=2681&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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

// Helper function to convert a base64 DataURL to a File object
const base64toFile = (dataUrl, filename) => {
  const arr = dataUrl.split(",");
  const mimeMatch = arr[0].match(/:(.*?);/);
  if (!mimeMatch) return null;
  const mime = mimeMatch[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

const Imagine = () => {
  // State for managing tabs, file upload, text prompt, preview image, and loading state
  const [activeTab, setActiveTab] = useState("generate");
  const [isHovering, setIsHovering] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [promptText, setPromptText] = useState("");
  const [loading, setLoading] = useState(false);

  // useRef for file input (hidden) to trigger click programmatically
  const fileInputRef = useRef(null);

  // Trigger when file is selected
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log("handleFileChange triggered");
    if (file) {
      console.log("File selected:", file.name);
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        // Set the preview to the uploaded image (base64 encoded)
        setPreviewURL(result);
        if (typeof result === "string") {
          console.log("File preview URL set (first few chars):", result.substring(0, 50));
        } else {
          console.log("File preview URL set (type is not string)");
        }
      };
      reader.readAsDataURL(file);
    } else {
      console.log("No file selected");
    }
  };

  // This function is called when the user clicks "Generate Designs"
  const handleGenerateDesigns = async () => {
    console.log("Generate Designs button pressed");
    // Allow chaining: if no new file is selected, use the generated (preview) image
    if (!selectedFile && !previewURL) {
      console.error("Upload validation failed: No file or previous image available.");
      alert("Please upload an image or use the generated image from a previous result!");
      return;
    }
    if (!promptText.trim()) {
      console.error("Prompt validation failed: Prompt is empty.");
      alert("Please enter a design description!");
      return;
    }

    setLoading(true);
    console.log("Loading state set to true");

    try {
      // Determine which image to send: new file or the previously generated image converted to a File object.
      const fileToSend = selectedFile ? selectedFile : base64toFile(previewURL, "generated.png");

      const formData = new FormData();
      formData.append("image", fileToSend);
      formData.append("prompt", promptText);
      console.log("FormData created");

      console.log("Sending POST request to http://localhost:8000/imagine/generate");
      const response = await fetch("http://localhost:8000/imagine/generate", {
        method: "POST",
        body: formData,
      });

      console.log("Received response from /imagine/generate, status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error Response:", errorText);
        alert(`Failed to generate design! Status: ${response.status}. ${errorText}`);
        setLoading(false);
        return;
      }
      const data = await response.json();
      console.log("API Success Response data:", data);
      // Expecting a JSON response with a base64 image string under "base64_image"
      if (data.base64_image) {
        const generatedImageUrl = "data:image/png;base64," + data.base64_image;
        setPreviewURL(generatedImageUrl);
        // Reset selected file so that chaining uses the newly generated image on subsequent calls
        setSelectedFile(null);
        console.log("Generated image preview URL set (first few chars):", generatedImageUrl.substring(0, 50));
      } else {
        console.warn("API response OK, but no base64_image found in data.");
        alert("No image returned from the API.");
      }
    } catch (error) {
      console.error("Error during fetch or processing in handleGenerateDesigns:", error);
      alert("An error occurred while generating the design. Check console for details.");
    }
    setLoading(false);
    console.log("Loading state set to false after generation attempt");
  };

  return (
    <div className="p-6">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Imagine</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Visualize your interior design ideas
          </p>
        </div>

        <Tabs defaultValue="generate" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="generate" className="flex items-center gap-2">
              <SquarePenIcon size={16} />
              <span>Generate Ideas</span>
            </TabsTrigger>
            <TabsTrigger value="gallery" className="flex items-center gap-2">
              <ImageIcon size={16} />
              <span>Design Gallery</span>
            </TabsTrigger>
          </TabsList>

          {/* Tab for generating ideas */}
          <TabsContent value="generate" className="animate-fade-in">
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left section: prompt input and generate button */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">
                      Generate design ideas with AI
                    </h3>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
                        Describe your space
                      </label>
                      <textarea
                        className="w-full min-h-[240px] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700"
                        placeholder="Example: A modern kitchen with white cabinets, wood accents, and a central island..."
                        value={promptText}
                        onChange={(e) => setPromptText(e.target.value)}
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
                    <Button
                      className="w-full bg-orange-500 hover:bg-orange-600"
                      onClick={handleGenerateDesigns}
                      disabled={loading}
                    >
                      {loading ? "Generating..." : "Generate Designs"}
                    </Button>
                  </div>
                  
                  {/* Right section: file upload / image preview */}
                  <div
                    className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8 h-[450px] dark:border-gray-700 cursor-pointer"
                    onClick={() => fileInputRef.current && fileInputRef.current.click()}
                  >
                    {/* Show preview image if available */}
                    {previewURL ? (
                      <img 
                        src={previewURL}
                        alt="Preview" 
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <>
                        <UploadIcon size={48} className="text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium mb-2">Upload your image</h3>
                        <p className="text-gray-500 text-center mb-6 max-w-md dark:text-gray-400">
                          Drag and drop your interior photos or floor plans here, or click to browse files
                        </p>
                        <Button className="bg-orange-500 hover:bg-orange-600">
                          Select Files
                        </Button>
                      </>
                    )}
                    {/* Hidden file input */}
                    <input 
                      type="file" 
                      accept="image/*" 
                      ref={fileInputRef} 
                      onChange={handleFileChange}
                      style={{ display: "none" }} 
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab for design gallery (unchanged sample designs) */}
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
        </Tabs>
      </div>
    </div>
  );
};

export default Imagine;
