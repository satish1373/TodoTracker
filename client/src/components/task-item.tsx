import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Task, UpdateTask } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { Edit2, Trash2, Check, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TaskItemProps {
  task: Task;
  onDelete: () => void;
}

export default function TaskItem({ task, onDelete }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const updateTaskMutation = useMutation({
    mutationFn: async (updates: UpdateTask) => {
      const response = await apiRequest("PATCH", `/api/tasks/${task.id}`, updates);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
      setIsEditing(false);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update task. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleToggleComplete = () => {
    updateTaskMutation.mutate({ completed: !task.completed });
    
    if (!task.completed) {
      toast({
        title: "Task completed!",
        description: "Great job on finishing your task.",
      });
    }
  };

  const handleSaveEdit = () => {
    const trimmedText = editText.trim();
    if (!trimmedText) return;
    
    if (trimmedText !== task.text) {
      updateTaskMutation.mutate({ text: trimmedText });
    } else {
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditText(task.text);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSaveEdit();
    } else if (e.key === "Escape") {
      handleCancelEdit();
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - new Date(date).getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    if (diffInHours < 48) return "Yesterday";
    return new Date(date).toLocaleDateString();
  };

  return (
    <Card 
      className={cn(
        "task-item transition-all duration-200 hover:shadow-md hover:-translate-y-0.5",
        task.completed && "task-completed opacity-70"
      )}
      data-testid={`task-item-${task.id}`}
    >
      <CardContent className="p-4">
        <div className="flex items-center space-x-4 group">
          {/* Task Checkbox */}
          <div className="flex-shrink-0">
            <Checkbox
              id={`task-${task.id}`}
              checked={task.completed}
              onCheckedChange={handleToggleComplete}
              disabled={updateTaskMutation.isPending}
              className="w-5 h-5"
              data-testid={`checkbox-${task.id}`}
            />
          </div>

          {/* Task Content */}
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div className="space-y-2">
                <Input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full"
                  autoFocus
                  disabled={updateTaskMutation.isPending}
                  data-testid={`input-edit-${task.id}`}
                />
                <div className="text-sm text-muted-foreground">
                  Created {formatDate(task.createdAt)}
                </div>
              </div>
            ) : (
              <div>
                <div 
                  className={cn(
                    "text-foreground",
                    task.completed && "line-through text-muted-foreground"
                  )}
                  data-testid={`text-${task.id}`}
                >
                  {task.text}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {task.completed ? 
                    `Completed ${formatDate(task.updatedAt)}` : 
                    `Created ${formatDate(task.createdAt)}`
                  }
                </div>
              </div>
            )}
          </div>

          {/* Task Actions */}
          <div className="flex items-center space-x-2">
            {isEditing ? (
              <>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleSaveEdit}
                  disabled={updateTaskMutation.isPending || !editText.trim()}
                  className="h-8 w-8 p-0 text-primary hover:bg-primary/10"
                  data-testid={`button-save-${task.id}`}
                >
                  <Check className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleCancelEdit}
                  disabled={updateTaskMutation.isPending}
                  className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent"
                  data-testid={`button-cancel-${task.id}`}
                >
                  <X className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsEditing(true)}
                  className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  data-testid={`button-edit-${task.id}`}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={onDelete}
                  className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  data-testid={`button-delete-${task.id}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
