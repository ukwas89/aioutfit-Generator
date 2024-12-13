import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";
import CustomCaptcha from "@/components/CustomCaptcha";

interface GeneratorFormProps {
  style: string;
  setStyle: (value: string) => void;
  occasion: string;
  setOccasion: (value: string) => void;
  age: string;
  setAge: (value: string) => void;
  gender: string;
  setGender: (value: string) => void;
  loading: boolean;
  progress: number;
  isCaptchaValid: boolean;
  setIsCaptchaValid: (value: boolean) => void;
  onGenerate: () => void;
}

const GeneratorForm = ({
  style,
  setStyle,
  occasion,
  setOccasion,
  age,
  setAge,
  gender,
  setGender,
  loading,
  progress,
  isCaptchaValid,
  setIsCaptchaValid,
  onGenerate
}: GeneratorFormProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Select value={style} onValueChange={setStyle}>
            <SelectTrigger>
              <SelectValue placeholder="Select your style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="casual">Casual</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="formal">Formal</SelectItem>
              <SelectItem value="streetwear">Streetwear</SelectItem>
              <SelectItem value="bohemian">Bohemian</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Select value={occasion} onValueChange={setOccasion}>
            <SelectTrigger>
              <SelectValue placeholder="Select the occasion" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="work">Work</SelectItem>
              <SelectItem value="date">Date Night</SelectItem>
              <SelectItem value="party">Party</SelectItem>
              <SelectItem value="weekend">Weekend</SelectItem>
              <SelectItem value="vacation">Vacation</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Select value={age} onValueChange={setAge}>
            <SelectTrigger>
              <SelectValue placeholder="Select age group" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="youth">Youth (13-25)</SelectItem>
              <SelectItem value="adult">Adult (26-50)</SelectItem>
              <SelectItem value="senior">Senior (51+)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Select value={gender} onValueChange={setGender}>
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="my-4">
        <CustomCaptcha onVerify={setIsCaptchaValid} />
      </div>

      {loading && (
        <div className="space-y-2">
          <Progress value={progress} className="w-full" />
          <p className="text-sm text-center text-muted-foreground">
            Generating your outfits... {progress}%
          </p>
        </div>
      )}

      <Button 
        className="w-full"
        onClick={onGenerate}
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating outfits...
          </>
        ) : (
          "Generate Outfits"
        )}
      </Button>
    </div>
  );
};

export default GeneratorForm;