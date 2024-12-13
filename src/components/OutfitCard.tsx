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
        // Unsplash
        "https://images.unsplash.com/photo-1503919545889-aef636e10ad4",
        "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8",
        // Pexels
        "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg",
        "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg",
        // Pixabay
        "https://cdn.pixabay.com/photo/2017/06/26/02/47/man-2442565_1280.jpg",
        "https://cdn.pixabay.com/photo/2016/11/29/09/32/man-1868632_1280.jpg",
        // Picsum
        "https://picsum.photos/seed/youth-male-1/800/600",
        "https://picsum.photos/seed/youth-male-2/800/600"
      ],
      female: [
        // Unsplash
        "https://images.unsplash.com/photo-1621452773781-0f992fd1f5cb",
        "https://images.unsplash.com/photo-1617952385804-7b326fa42766",
        // Pexels
        "https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg",
        "https://images.pexels.com/photos/1375849/pexels-photo-1375849.jpeg",
        // Pixabay
        "https://cdn.pixabay.com/photo/2018/01/29/17/01/woman-3116587_1280.jpg",
        "https://cdn.pixabay.com/photo/2017/08/06/12/06/people-2591874_1280.jpg",
        // Picsum
        "https://picsum.photos/seed/youth-female-1/800/600",
        "https://picsum.photos/seed/youth-female-2/800/600"
      ]
    },
    adult: {
      male: [
        // Unsplash
        "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f",
        "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
        // Pexels
        "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
        "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg",
        // Pixabay
        "https://cdn.pixabay.com/photo/2016/11/18/19/07/man-1836085_1280.jpg",
        "https://cdn.pixabay.com/photo/2015/01/08/18/29/entrepreneur-593358_1280.jpg",
        // Picsum
        "https://picsum.photos/seed/adult-male-1/800/600",
        "https://picsum.photos/seed/adult-male-2/800/600"
      ],
      female: [
        // Unsplash
        "https://images.unsplash.com/photo-1539109136881-3be0616acf4b",
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
        // Pexels
        "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
        "https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg",
        // Pixabay
        "https://cdn.pixabay.com/photo/2017/08/06/15/13/woman-2593366_1280.jpg",
        "https://cdn.pixabay.com/photo/2016/11/29/13/54/woman-1869761_1280.jpg",
        // Picsum
        "https://picsum.photos/seed/adult-female-1/800/600",
        "https://picsum.photos/seed/adult-female-2/800/600"
      ]
    },
    senior: {
      male: [
        // Unsplash
        "https://images.unsplash.com/photo-1437915015400-137312b61975",
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
        // Pexels
        "https://images.pexels.com/photos/834863/pexels-photo-834863.jpeg",
        "https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg",
        // Pixabay
        "https://cdn.pixabay.com/photo/2016/11/21/11/32/elderly-1844729_1280.jpg",
        "https://cdn.pixabay.com/photo/2016/11/18/19/07/happy-1836445_1280.jpg",
        // Picsum
        "https://picsum.photos/seed/senior-male-1/800/600",
        "https://picsum.photos/seed/senior-male-2/800/600"
      ],
      female: [
        // Unsplash
        "https://images.unsplash.com/photo-1581591524425-c7e0978865fc",
        "https://images.unsplash.com/photo-1552692723-a4d2e6f8acd3",
        // Pexels
        "https://images.pexels.com/photos/2050994/pexels-photo-2050994.jpeg",
        "https://images.pexels.com/photos/2050999/pexels-photo-2050999.jpeg",
        // Pixabay
        "https://cdn.pixabay.com/photo/2016/11/29/11/24/woman-1869115_1280.jpg",
        "https://cdn.pixabay.com/photo/2015/06/22/08/40/senior-817735_1280.jpg",
        // Picsum
        "https://picsum.photos/seed/senior-female-1/800/600",
        "https://picsum.photos/seed/senior-female-2/800/600"
      ]
    }
  };

  const getRandomImage = () => {
    let categoryImages = imageCategories[age as keyof typeof imageCategories]?.[gender as 'male' | 'female'] || 
                        imageCategories.adult.male;
    
    // Filter out all previously used images
    let availableImages = categoryImages.filter(img => !usedImages.includes(img));
    
    // If no unique images are available, reset the category but avoid the last used image
    if (availableImages.length === 0) {
      const lastUsedImage = currentImage.split('?')[0];
      availableImages = categoryImages.filter(img => img !== lastUsedImage);
    }
    
    // Select a random image from available ones
    const randomIndex = Math.floor(Math.random() * availableImages.length);
    const selectedImage = availableImages[randomIndex];
    
    // Notify parent component about the selected image
    onImageSelected(selectedImage);
    
    // Return the image URL with quality parameters and timestamp to prevent caching
    return `${selectedImage}?timestamp=${Date.now()}`;
  };

  useEffect(() => {
    const updateImage = () => {
      const newImage = getRandomImage();
      setCurrentImage(newImage);
    };

    // Set initial image when component mounts
    if (!currentImage) {
      updateImage();
    }
    // Update image when shouldRefresh changes
    else if (shouldRefresh) {
      updateImage();
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