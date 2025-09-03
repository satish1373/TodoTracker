import { Task } from "@shared/schema";
import TaskItem from "./task-item";
import { Card, CardContent } from "@/components/ui/card";
import { ClipboardList } from "lucide-react";

interface TaskListProps {
  tasks: Task[];
  onDeleteTask: (taskId: string) => void;
}

export default function TaskList({ tasks, onDeleteTask }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <Card className="mb-8">
        <CardContent className="p-12 text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <ClipboardList className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No tasks yet</h3>
          <p className="text-muted-foreground">
            Add a task above to get started with your productivity journey!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3 mb-8">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={() => onDeleteTask(task.id)}
        />
      ))}
    </div>
  );
}
