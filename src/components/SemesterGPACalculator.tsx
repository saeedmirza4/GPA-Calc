import { useState } from "react";
import { Plus, Trash2, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GradeProgressBar } from "./GradeProgressBar";

interface Subject {
  id: string;
  name: string;
  creditHours: number;
  grade: string;
  gradePoints: number;
}

// Grading scale as specified
const gradingScale = [
  { grade: "A", points: 4.00, label: "Excellent", range: "86-100%" },
  { grade: "A-", points: 3.67, label: "Excellent", range: "82-85%" },
  { grade: "B+", points: 3.33, label: "Good", range: "78-81%" },
  { grade: "B", points: 3.00, label: "Good", range: "74-77%" },
  { grade: "B-", points: 2.67, label: "Good", range: "70-73%" },
  { grade: "C+", points: 2.33, label: "Satisfactory", range: "66-69%" },
  { grade: "C", points: 2.00, label: "Satisfactory", range: "62-65%" },
  { grade: "C-", points: 1.67, label: "Satisfactory", range: "58-61%" },
  { grade: "D+", points: 1.33, label: "Poor but passing", range: "54-57%" },
  { grade: "D", points: 1.00, label: "Poor but passing", range: "50-53%" },
  { grade: "F", points: 0.00, label: "Fail", range: "Below 50%" }
];

const getGradeInfo = (gradeValue: string) => {
  const grade = gradingScale.find(g => g.grade === gradeValue);
  return grade || { grade: "F", points: 0.00, label: "Fail", range: "Below 50%" };
};

interface SemesterGPACalculatorProps {
  onGPACalculated?: (gpa: number, totalCredits: number) => void;
}

export function SemesterGPACalculator({ onGPACalculated }: SemesterGPACalculatorProps) {
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: "1", name: "", creditHours: 0, grade: "", gradePoints: 0 }
  ]);

  const addSubject = () => {
    const newSubject: Subject = {
      id: Date.now().toString(),
      name: "",
      creditHours: 0,
      grade: "",
      gradePoints: 0
    };
    setSubjects([...subjects, newSubject]);
  };

  const removeSubject = (id: string) => {
    if (subjects.length > 1) {
      setSubjects(subjects.filter(subject => subject.id !== id));
    }
  };

  const updateSubject = (id: string, field: keyof Subject, value: string | number) => {
    setSubjects(subjects.map(subject => {
      if (subject.id === id) {
        const updatedSubject = { ...subject, [field]: value };
        
        // Auto-calculate grade points when grade changes
        if (field === 'grade' && typeof value === 'string') {
          const gradeInfo = getGradeInfo(value);
          updatedSubject.gradePoints = gradeInfo.points;
        }
        
        return updatedSubject;
      }
      return subject;
    }));
  };

  // Calculate GPA in real-time
  const calculateGPA = () => {
    const validSubjects = subjects.filter(s => s.name && s.creditHours > 0);
    if (validSubjects.length === 0) return { gpa: 0, totalCredits: 0 };

    const totalPoints = validSubjects.reduce((sum, subject) => 
      sum + (subject.gradePoints * subject.creditHours), 0);
    const totalCredits = validSubjects.reduce((sum, subject) => 
      sum + subject.creditHours, 0);
    
    const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;
    
    // Notify parent component
    if (onGPACalculated) {
      onGPACalculated(gpa, totalCredits);
    }
    
    return { gpa, totalCredits };
  };

  const { gpa, totalCredits } = calculateGPA();

  return (
    <Card className="shadow-medium hover:shadow-glow transition-all duration-300">
      <CardHeader className="bg-gradient-primary text-primary-foreground rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <GraduationCap className="h-5 w-5" />
          Semester GPA Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {subjects.map((subject, index) => (
          <div key={subject.id} className="p-4 border rounded-lg space-y-3 animate-fade-in">
            <div className="flex justify-between items-center">
              <Label className="font-semibold">Subject {index + 1}</Label>
              {subjects.length > 1 && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeSubject(subject.id)}
                  className="h-8 w-8 p-0"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <Label htmlFor={`name-${subject.id}`}>Course Name</Label>
                <Input
                  id={`name-${subject.id}`}
                  placeholder="e.g., Mathematics"
                  value={subject.name}
                  onChange={(e) => updateSubject(subject.id, 'name', e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor={`credits-${subject.id}`}>Credit Hours</Label>
                <Input
                  id={`credits-${subject.id}`}
                  type="number"
                  min="0"
                  max="6"
                  step="1"
                  placeholder="3"
                  value={subject.creditHours || ''}
                  onChange={(e) => updateSubject(subject.id, 'creditHours', parseInt(e.target.value) || 0)}
                />
              </div>
              
              <div>
                <Label htmlFor={`grade-${subject.id}`}>Grade</Label>
                <Select
                  value={subject.grade}
                  onValueChange={(value) => updateSubject(subject.id, 'grade', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {gradingScale.map((gradeOption) => (
                      <SelectItem key={gradeOption.grade} value={gradeOption.grade}>
                        <div className="flex items-center justify-between w-full">
                          <span className="font-bold">{gradeOption.grade}</span>
                          <span className="ml-2 text-sm text-muted-foreground">
                            {gradeOption.points.toFixed(2)} - {gradeOption.range}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {subject.grade && (
                  <div className="mt-1 text-xs text-muted-foreground">
                    Grade Points: {subject.gradePoints.toFixed(2)} | {getGradeInfo(subject.grade).label}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        <Button
          onClick={addSubject}
          variant="outline"
          className="w-full border-dashed border-2 hover:bg-muted/50"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Another Subject
        </Button>

        {gpa > 0 && (
          <div className="mt-6 p-4 bg-gradient-to-r from-muted/50 to-muted/30 rounded-lg animate-scale-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{totalCredits}</div>
                <div className="text-sm text-muted-foreground">Total Credits</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  {gpa.toFixed(2)}
                </div>
                <div className="text-sm text-muted-foreground">Semester GPA</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-success">
                  {gpa >= 3.67 ? "Excellent" : gpa >= 3.00 ? "Good" : gpa >= 2.00 ? "Satisfactory" : gpa >= 1.00 ? "Poor but Passing" : "Fail"}
                </div>
                <div className="text-sm text-muted-foreground">Academic Standing</div>
              </div>
            </div>
            
            <GradeProgressBar gpa={gpa} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}