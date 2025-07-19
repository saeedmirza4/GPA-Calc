import { useState } from "react";
import { Plus, Trash2, Calculator, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { GradeProgressBar } from "./GradeProgressBar";

interface Semester {
  id: string;
  name: string;
  gpa: number;
  creditHours: number;
}

interface CGPACalculatorProps {
  currentSemesterGPA?: number;
  currentSemesterCredits?: number;
  onCGPACalculated?: (cgpa: number, totalCredits: number) => void;
}

export function CGPACalculator({ currentSemesterGPA = 0, currentSemesterCredits = 0, onCGPACalculated }: CGPACalculatorProps) {
  const [semesters, setSemesters] = useState<Semester[]>([
    { id: "1", name: "", gpa: 0, creditHours: 0 }
  ]);

  const addSemester = () => {
    const newSemester: Semester = {
      id: Date.now().toString(),
      name: "",
      gpa: 0,
      creditHours: 0
    };
    setSemesters([...semesters, newSemester]);
  };

  const removeSemester = (id: string) => {
    if (semesters.length > 1) {
      setSemesters(semesters.filter(semester => semester.id !== id));
    }
  };

  const updateSemester = (id: string, field: keyof Semester, value: string | number) => {
    setSemesters(semesters.map(semester => 
      semester.id === id ? { ...semester, [field]: value } : semester
    ));
  };

  // Calculate CGPA in real-time
  const calculateCGPA = () => {
    const validSemesters = semesters.filter(s => s.name && s.creditHours > 0 && s.gpa > 0);
    
    // Include current semester if available
    let totalPoints = validSemesters.reduce((sum, semester) => 
      sum + (semester.gpa * semester.creditHours), 0);
    let totalCredits = validSemesters.reduce((sum, semester) => 
      sum + semester.creditHours, 0);

    if (currentSemesterGPA > 0 && currentSemesterCredits > 0) {
      totalPoints += currentSemesterGPA * currentSemesterCredits;
      totalCredits += currentSemesterCredits;
    }

    const cgpa = totalCredits > 0 ? totalPoints / totalCredits : 0;
    
    // Notify parent component
    if (onCGPACalculated && cgpa > 0) {
      onCGPACalculated(cgpa, totalCredits);
    }
    
    return { cgpa, totalCredits, totalSemesters: validSemesters.length + (currentSemesterGPA > 0 ? 1 : 0) };
  };

  const { cgpa, totalCredits, totalSemesters } = calculateCGPA();

  return (
    <Card className="shadow-medium hover:shadow-glow transition-all duration-300">
      <CardHeader className="bg-gradient-secondary text-secondary-foreground rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          CGPA Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg border-l-4 border-primary">
          <strong>Tip:</strong> Enter your previous semester GPAs and credit hours. The current semester will be included automatically if calculated above.
        </div>

        {currentSemesterGPA > 0 && (
          <div className="p-4 bg-primary/10 border-2 border-primary/20 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="h-4 w-4 text-primary" />
              <Label className="font-semibold text-primary">Current Semester (Auto-included)</Label>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">GPA:</span>
                <span className="ml-2 font-bold text-primary">{currentSemesterGPA.toFixed(2)}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Credits:</span>
                <span className="ml-2 font-bold text-primary">{currentSemesterCredits}</span>
              </div>
            </div>
          </div>
        )}

        {semesters.map((semester, index) => (
          <div key={semester.id} className="p-4 border rounded-lg space-y-3 animate-fade-in">
            <div className="flex justify-between items-center">
              <Label className="font-semibold">Previous Semester {index + 1}</Label>
              {semesters.length > 1 && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeSemester(semester.id)}
                  className="h-8 w-8 p-0"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <Label htmlFor={`semester-name-${semester.id}`}>Semester Name</Label>
                <Input
                  id={`semester-name-${semester.id}`}
                  placeholder="e.g., Fall 2023"
                  value={semester.name}
                  onChange={(e) => updateSemester(semester.id, 'name', e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor={`semester-gpa-${semester.id}`}>Semester GPA</Label>
                <Input
                  id={`semester-gpa-${semester.id}`}
                  type="number"
                  min="0"
                  max="4"
                  step="0.01"
                  placeholder="3.50"
                  value={semester.gpa || ''}
                  onChange={(e) => updateSemester(semester.id, 'gpa', parseFloat(e.target.value) || 0)}
                />
              </div>
              
              <div>
                <Label htmlFor={`semester-credits-${semester.id}`}>Credit Hours</Label>
                <Input
                  id={`semester-credits-${semester.id}`}
                  type="number"
                  min="0"
                  max="25"
                  step="1"
                  placeholder="18"
                  value={semester.creditHours || ''}
                  onChange={(e) => updateSemester(semester.id, 'creditHours', parseInt(e.target.value) || 0)}
                />
              </div>
            </div>
          </div>
        ))}

        <Button
          onClick={addSemester}
          variant="outline"
          className="w-full border-dashed border-2 hover:bg-muted/50"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Previous Semester
        </Button>

        {cgpa > 0 && (
          <div className="mt-6 p-4 bg-gradient-to-r from-secondary/20 to-accent/20 rounded-lg animate-scale-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">{totalSemesters}</div>
                <div className="text-sm text-muted-foreground">Total Semesters</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-secondary bg-clip-text text-transparent">
                  {cgpa.toFixed(2)}
                </div>
                <div className="text-sm text-muted-foreground">Cumulative GPA</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">{totalCredits}</div>
                <div className="text-sm text-muted-foreground">Total Credits</div>
              </div>
            </div>
            
            <GradeProgressBar gpa={cgpa} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}