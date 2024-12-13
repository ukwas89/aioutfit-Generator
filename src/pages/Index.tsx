import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import OutfitCard from "@/components/OutfitCard";
import { Progress } from "@/components/ui/progress";

declare global {
  interface Window {
    grecaptcha: any;
  }
}

const Index = () => {
  const [loading, setLoading] = useState(false);
  const [outfits, setOutfits] = useState<string[]>([]);
  const [style, setStyle] = useState("");
  const [occasion, setOccasion] = useState("");
  const [progress, setProgress] = useState(0);
  const [captchaResponse, setCaptchaResponse] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Load reCAPTCHA script
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 150);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const generateOutfit = async () => {
    if (!style || !occasion) {
      toast({
        title: "Please fill in all fields",
        description: "Both style and occasion are required to generate an outfit.",
        variant: "destructive",
      });
      return;
    }

    // Verify reCAPTCHA
    const recaptchaResponse = window.grecaptcha.getResponse();
    if (!recaptchaResponse) {
      toast({
        title: "CAPTCHA verification required",
        description: "Please complete the CAPTCHA to generate outfits.",
        variant: "destructive",
      });
      return;
    }

    setCaptchaResponse(recaptchaResponse);

    setLoading(true);
    try {
      // Simulate API call with setTimeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock generated outfits
      const mockOutfits = [
        `For a ${occasion} in ${style} style, try: A tailored blazer in navy blue, paired with high-waisted cream trousers, and leather loafers.`,
        `Another ${style} option for ${occasion}: A silk blouse in blush pink, matched with a pleated midi skirt and pointed toe heels.`,
        `${style} alternative for ${occasion}: A cashmere sweater in camel, dark wash jeans, and suede ankle boots.`
      ];
      
      setOutfits(mockOutfits);
      toast({
        title: "Outfits generated!",
        description: "Here are some stylish suggestions for you.",
      });
    } catch (error) {
      toast({
        title: "Error generating outfits",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setProgress(100);
      window.grecaptcha.reset(); // Reset CAPTCHA after use
    }
  };

  return (
    <div className="min-h-screen p-6 md:p-12 bg-gradient-to-b from-background to-secondary">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            AI Outfit Generator
          </h1>
          <p className="text-lg text-muted-foreground">
            Get personalized outfit suggestions based on your style preferences
          </p>
        </div>

        <Card className="p-6 space-y-6">
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
          </div>

          {/* Visible reCAPTCHA */}
          <div className="flex justify-center my-4">
            <div 
              className="g-recaptcha" 
              data-sitekey="6LdqVBQqAAAAALgxUrTVpOAI9Gj6JqfkWD_Qw1Ub" 
              data-callback="onCaptchaSuccess"
            ></div>
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
            onClick={generateOutfit}
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
        </Card>

        {outfits.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {outfits.map((outfit, index) => (
              <OutfitCard key={index} description={outfit} imageIndex={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;