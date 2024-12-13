import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

interface OutfitCardProps {
  description: string;
}

const OutfitCard = ({ description }: OutfitCardProps) => {
  return (
    <Card className="outfit-card hover:scale-[1.02] transition-transform duration-300">
      <CardContent className="pt-6">
        <div className="flex items-start space-x-4">
          <Sparkles className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
          <p className="text-foreground leading-relaxed">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default OutfitCard;