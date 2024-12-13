import { Github } from "lucide-react";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="w-full bg-white border-b border-gray-200 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src="/favicon.ico" alt="Style Muse Logo" className="w-8 h-8" />
            <h1 className="text-xl font-bold text-primary">Style Muse AI</h1>
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Github className="w-4 h-4" />
            <span>Star on GitHub</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;