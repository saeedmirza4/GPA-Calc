import { useState } from "react";
import { GraduationCap, Calculator, TrendingUp } from "lucide-react";
import { SemesterGPACalculator } from "@/components/SemesterGPACalculator";
import { CGPACalculator } from "@/components/CGPACalculator";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import { ExportToPDF } from "@/components/ExportToPDF";
import { FloatingActionButton } from "@/components/FloatingActionButton";
import { InstructionsSection } from "@/components/InstructionsSection";

const Index = () => {
  const [currentGPA, setCurrentGPA] = useState(0);
  const [currentCredits, setCurrentCredits] = useState(0);
  const [cgpa, setCgpa] = useState(0);
  const [totalCredits, setTotalCredits] = useState(0);

  const handleGPACalculated = (gpa: number, credits: number) => {
    setCurrentGPA(gpa);
    setCurrentCredits(credits);
  };

  const handleCGPACalculated = (calculatedCgpa: number, calculatedTotalCredits: number) => {
    setCgpa(calculatedCgpa);
    setTotalCredits(calculatedTotalCredits);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Dark Mode Toggle */}
      <DarkModeToggle />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10" />
        <div className="relative container mx-auto px-4 py-16 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-primary rounded-full shadow-glow animate-pulse-glow">
              <GraduationCap className="h-12 w-12 text-primary-foreground" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              GPA & CGPA Calculator
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in">
            Calculate your academic performance with our modern, responsive calculator designed for university students.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-full shadow-soft">
              <Calculator className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Real-time Calculation</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-full shadow-soft">
              <TrendingUp className="h-4 w-4 text-secondary" />
              <span className="text-sm font-medium">Grade Analytics</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-full shadow-soft">
              <GraduationCap className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium">Academic Standing</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Calculator Section */}
      <div id="gpa-calculator" className="container mx-auto px-4 py-8 space-y-8">
        {/* Semester GPA Calculator */}
        <div className="animate-fade-in">
          <SemesterGPACalculator onGPACalculated={handleGPACalculated} />
        </div>

        {/* CGPA Calculator */}
        <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <CGPACalculator 
            currentSemesterGPA={currentGPA} 
            currentSemesterCredits={currentCredits}
            onCGPACalculated={handleCGPACalculated}
          />
        </div>

        {/* Export Section */}
        {(currentGPA > 0 || cgpa > 0) && (
          <div className="flex justify-center animate-scale-in">
            <ExportToPDF 
              gpa={currentGPA}
              cgpa={cgpa}
              totalCredits={totalCredits}
              studentName="Student Name"
            />
          </div>
        )}

        {/* Instructions Section */}
        <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <InstructionsSection />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-card border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-3 bg-gradient-primary rounded-lg">
                <GraduationCap className="h-6 w-6 text-primary-foreground" />
              </div>
            </div>
            <h3 className="text-lg font-semibold">GPA Calculator</h3>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              A modern, responsive tool for calculating university GPA and CGPA with real-time updates and beautiful visualizations.
            </p>
            <div className="pt-4 border-t">
              <p className="text-xs text-muted-foreground">
              Built with 💻 by <span className="font-semibold text-primary">Saeed Ur Rehman</span> - BCS233057
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                University Academic Performance Calculator
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Button */}
      <FloatingActionButton />
    </div>
  );
};

export default Index;
