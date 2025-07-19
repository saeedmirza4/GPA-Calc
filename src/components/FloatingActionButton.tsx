import { useState, useEffect } from "react";
import { ArrowUp, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FloatingActionButton() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToCalculator = () => {
    const calculator = document.querySelector('#gpa-calculator');
    if (calculator) {
      calculator.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          size="icon"
          className="h-12 w-12 rounded-full bg-gradient-primary hover:bg-gradient-primary/90 shadow-glow animate-pulse-glow"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}
      
      <Button
        onClick={scrollToCalculator}
        size="icon"
        className="h-14 w-14 rounded-full bg-gradient-secondary hover:bg-gradient-secondary/90 shadow-glow animate-pulse-glow"
      >
        <Calculator className="h-6 w-6" />
      </Button>
    </div>
  );
}