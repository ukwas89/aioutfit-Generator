import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

interface OutfitCardProps {
  description: string;
  imageIndex: number;
}

const OutfitCard = ({ description, imageIndex }: OutfitCardProps) => {
  // Using reliable fashion-related placeholder images
  const images = [
    "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=720&q=80",
    "https://images.unsplash.com/photo-1554412933-514a83d2f3c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=672&q=80",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=720&q=80"
  ];

  return (
    <Card className="outfit-card hover:scale-[1.02] transition-transform duration-300">
      <CardContent className="pt-6 space-y-4">
        <img
          src={images[imageIndex % images.length]}
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