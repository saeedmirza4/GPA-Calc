import { Progress } from "@/components/ui/progress";

interface GradeProgressBarProps {
  gpa: number;
  maxGpa?: number;
}

// GPA color and status mapping based on the grading criteria
const getGradeInfo = (gpa: number) => {
  if (gpa >= 3.67) return { status: "Excellent", color: "bg-gradient-secondary", percentage: 100 };
  if (gpa >= 3.00) return { status: "Good", color: "bg-gradient-primary", percentage: 85 };
  if (gpa >= 2.00) return { status: "Satisfactory", color: "bg-gradient-accent", percentage: 60 };
  if (gpa >= 1.00) return { status: "Poor but Passing", color: "bg-warning", percentage: 35 };
  return { status: "Fail", color: "bg-destructive", percentage: 10 };
};

export function GradeProgressBar({ gpa, maxGpa = 4.0 }: GradeProgressBarProps) {
  const gradeInfo = getGradeInfo(gpa);
  const progressValue = (gpa / maxGpa) * 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">Academic Standing</span>
        <span className="text-sm text-muted-foreground">{gpa.toFixed(2)}/{maxGpa}</span>
      </div>
      <Progress 
        value={progressValue} 
        className="h-3"
      />
      <div className="flex justify-between items-center">
        <span className={`text-sm font-semibold ${gpa >= 2.0 ? 'text-success' : 'text-destructive'}`}>
          {gradeInfo.status}
        </span>
        <span className="text-xs text-muted-foreground">
          {progressValue.toFixed(1)}%
        </span>
      </div>
    </div>
  );
}