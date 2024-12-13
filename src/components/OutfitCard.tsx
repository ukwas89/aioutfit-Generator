import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

interface OutfitCardProps {
  description: string;
  imageIndex: number;
  age?: string;
  gender?: string;
  usedImages: string[];
  onImageSelected: (image: string) => void;
  shouldRefresh: boolean;
}

const OutfitCard = ({ 
  description, 
  age = "adult", 
  gender = "unisex", 
  usedImages,
  onImageSelected,
  shouldRefresh 
}: OutfitCardProps) => {
  const [currentImage, setCurrentImage] = useState<string>("");

  const imageCategories = {
    youth: {
      male: [
        "https://images.unsplash.com/photo-1503919545889-aef636e10ad4",
        "https://images.unsplash.com/photo-1513269890889-8e4e362e5593",
        "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8",
        "https://images.unsplash.com/photo-1600486913747-55e5470d6f40",
        "https://images.unsplash.com/photo-1618886614638-80e3c103d31a",
        "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4"
      ],
      female: [
        "https://images.unsplash.com/photo-1621452773781-0f992fd1f5cb",
        "https://images.unsplash.com/photo-1617952385804-7b326fa42766",
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
        "https://images.unsplash.com/photo-1618721405821-80ebc4b63d26",
        "https://images.unsplash.com/photo-1617059322001-a61b0ce36afc",
        "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec"
      ]
    },
    adult: {
      male: [
        "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f",
        "https://images.unsplash.com/photo-1618886614638-80e3c103d31a",
        "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
        "https://images.unsplash.com/photo-1600486913747-55e5470d6f40",
        "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4",
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7"
      ],
      female: [
        "https://images.unsplash.com/photo-1539109136881-3be0616acf4b",
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
        "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5",
        "https://images.unsplash.com/photo-1617922001439-4a2e6562f328",
        "https://images.unsplash.com/photo-1618721405821-80ebc4b63d26",
        "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec"
      ]
    },
    senior: {
      male: [
        "https://images.unsplash.com/photo-1437915015400-137312b61975",
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
        "https://images.unsplash.com/photo-1595152452543-e5fc28ebc2b8",
        "https://images.unsplash.com/photo-1559963110-71b394e7494d",
        "https://images.unsplash.com/photo-1546525848-3ce03ca516f6",
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d"
      ],
      female: [
        "https://images.unsplash.com/photo-1581591524425-c7e0978865fc",
        "https://images.unsplash.com/photo-1552692723-a4d2e6f8acd3",
        "https://images.unsplash.com/photo-1566616213894-2d4e1baee5d8",
        "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91",
        "https://images.unsplash.com/photo-1631947430066-48c30d57b943",
        "https://images.unsplash.com/photo-1597223557154-721c1cecc4b0"
      ]
    }
  };

  const getRandomImage = () => {
    const categoryImages = imageCategories[age as keyof typeof imageCategories]?.[gender as 'male' | 'female'] || 
                         imageCategories.adult.male;
    
    // Filter out already used images
    const availableImages = categoryImages.filter(img => !usedImages.includes(img));
    
    // If all images have been used, return a default image
    if (availableImages.length === 0) {
      console.warn('No more unique images available');
      return categoryImages[0]; // Return first image as fallback
    }
    
    const randomIndex = Math.floor(Math.random() * availableImages.length);
    const selectedImage = availableImages[randomIndex];
    
    // Add quality parameters to the Unsplash URL
    const imageWithParams = `${selectedImage}?auto=format&fit=crop&w=800&q=80`;
    
    // Notify parent component about the selected image
    onImageSelected(selectedImage);
    
    return imageWithParams;
  };

  useEffect(() => {
    // Set initial image when component mounts
    if (!currentImage) {
      const newImage = getRandomImage();
      setCurrentImage(newImage);
    }
    // Update image when shouldRefresh changes
    else if (shouldRefresh) {
      const newImage = getRandomImage();
      setCurrentImage(newImage);
    }
  }, [shouldRefresh]);

  return (
    <Card className="outfit-card hover:scale-[1.02] transition-transform duration-300">
      <CardContent className="pt-6 space-y-4">
        <img
          src={currentImage}
          alt="Outfit suggestion"
          className="w-full h-48 object-cover rounded-md"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://placehold.co/600x400/png?text=Outfit+Image";
          }}
        />
        <div className="flex items-start space-x-4">
          <Sparkles className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
          <p className="text-foreground leading-relaxed">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default OutfitCard;