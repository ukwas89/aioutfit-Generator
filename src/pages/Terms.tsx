import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        
        <div className="prose prose-gray max-w-none">
          <h2>Acceptance of Terms</h2>
          <p>By accessing and using AI Outfit Generator, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>

          <h2>Use License</h2>
          <p>Permission is granted to temporarily use AI Outfit Generator for personal, non-commercial purposes only. This is the grant of a license, not a transfer of title.</p>

          <h2>Disclaimer</h2>
          <p>The outfit suggestions provided by our AI are recommendations only. We make no guarantees regarding the suitability or availability of suggested items.</p>

          <h2>Limitations</h2>
          <p>In no event shall AI Outfit Generator be liable for any damages arising out of the use or inability to use our services.</p>
        </div>
      </div>
    </div>
  );
};

export default Terms;