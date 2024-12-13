import OutfitCard from "@/components/OutfitCard";

interface OutfitResultsProps {
  outfits: string[];
  age: string;
  gender: string;
  usedImages: string[];
  onImageSelected: (image: string) => void;
  shouldRefreshImages: boolean;
}

const OutfitResults = ({
  outfits,
  age,
  gender,
  usedImages,
  onImageSelected,
  shouldRefreshImages
}: OutfitResultsProps) => {
  // Only show outfits when we have both description and image capability
  const hasValidOutfits = outfits.length > 0;

  if (!hasValidOutfits) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {outfits.map((outfit, index) => (
        <OutfitCard 
          key={index} 
          description={outfit} 
          imageIndex={index} 
          age={age}
          gender={gender}
          usedImages={usedImages}
          onImageSelected={onImageSelected}
          shouldRefresh={shouldRefreshImages}
        />
      ))}
    </div>
  );
};

export default OutfitResults;