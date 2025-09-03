import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface TaskStatsProps {
  stats: {
    total: number;
    active: number;
    completed: number;
    completionPercentage: number;
  };
}

export default function TaskStats({ stats }: TaskStatsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Productivity Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary" data-testid="stat-total">
              {stats.total}
            </div>
            <div className="text-sm text-muted-foreground">Total Tasks</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-destructive" data-testid="stat-active">
              {stats.active}
            </div>
            <div className="text-sm text-muted-foreground">Active Tasks</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary" data-testid="stat-completed">
              {stats.completed}
            </div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div>
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>Progress</span>
            <span data-testid="completion-percentage">{stats.completionPercentage}%</span>
          </div>
          <Progress 
            value={stats.completionPercentage} 
            className="h-2"
            data-testid="progress-bar"
          />
        </div>
      </CardContent>
    </Card>
  );
}
