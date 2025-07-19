import { BookOpen, Calculator, Download, Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function InstructionsSection() {
  const instructions = [
    {
      icon: Calculator,
      title: "Calculate Semester GPA",
      description: "Add your current semester subjects with course names, credit hours, and grades. The GPA is calculated automatically using our grading scale.",
      tips: ["Select grades from dropdown (A, A-, B+, etc.)", "Credit hours typically range from 1-4", "Grade points are assigned automatically"]
    },
    {
      icon: BookOpen,
      title: "Calculate CGPA",
      description: "Enter your previous semester GPAs and credit hours. The current semester will be included automatically if calculated above.",
      tips: ["Use semester GPA (not individual subject GPAs)", "Include all completed semesters", "Current semester is auto-included"]
    },
    {
      icon: Download,
      title: "Export Results",
      description: "Generate a professional PDF report of your academic performance including GPA, CGPA, and grading scale.",
      tips: ["PDF includes complete grading scale", "Reports show academic standing", "Save for academic records"]
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="shadow-medium">
        <CardHeader className="bg-gradient-accent text-accent-foreground rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            How to Use This Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {instructions.map((instruction, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <instruction.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg">{instruction.title}</h3>
                </div>
                
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {instruction.description}
                </p>
                
                <div className="space-y-1">
                  {instruction.tips.map((tip, tipIndex) => (
                    <div key={tipIndex} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-soft">
        <CardContent className="p-6">
          <div className="text-center space-y-3">
            <h3 className="text-lg font-semibold">Grading Scale Reference</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="space-y-1">
                <div className="font-semibold text-success">Excellent</div>
                <div className="text-muted-foreground">A (4.00) - A- (3.67)</div>
                <div className="text-xs">86-100%</div>
              </div>
              <div className="space-y-1">
                <div className="font-semibold text-primary">Good</div>
                <div className="text-muted-foreground">B+ (3.33) - B- (2.67)</div>
                <div className="text-xs">70-81%</div>
              </div>
              <div className="space-y-1">
                <div className="font-semibold text-accent">Satisfactory</div>
                <div className="text-muted-foreground">C+ (2.33) - C- (1.67)</div>
                <div className="text-xs">58-69%</div>
              </div>
              <div className="space-y-1">
                <div className="font-semibold text-warning">Passing</div>
                <div className="text-muted-foreground">D+ (1.33) - D (1.00)</div>
                <div className="text-xs">50-57%</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}