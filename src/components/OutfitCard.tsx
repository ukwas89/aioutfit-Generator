import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface OutfitCardProps {
  description: string;
  imageIndex: number;
}

const OutfitCard = ({ description, imageIndex }: OutfitCardProps) => {
  const images = [
    "photo-1649972904349-6e44c42644a7",
    "photo-1581091226825-a6a2a5aee158",
    "photo-1581090464777-f3220bbe1b8b",
    "photo-1526374965328-7f61d4dc18c5"
  ];

  return (
    <Card className="outfit-card hover:scale-[1.02] transition-transform duration-300">
      <CardContent className="pt-6 space-y-4">
        <img
          src={`https://source.unsplash.com/${images[imageIndex % images.length]}`}
          alt="Outfit suggestion"
          className="w-full h-48 object-cover rounded-md"
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