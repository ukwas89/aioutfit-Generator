import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose prose-gray max-w-none">
          <h2>Information We Collect</h2>
          <p>We collect information that you provide directly to us when using the AI Outfit Generator, including:</p>
          <ul>
            <li>Style preferences</li>
            <li>Occasion selections</li>
            <li>Age and gender preferences</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Generate personalized outfit recommendations</li>
            <li>Improve our AI algorithms</li>
            <li>Enhance user experience</li>
          </ul>

          <h2>Data Security</h2>
          <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;