import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { InsertTask } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function TaskInput() {
  const [text, setText] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createTaskMutation = useMutation({
    mutationFn: async (task: InsertTask) => {
      const response = await apiRequest("POST", "/api/tasks", task);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
      setText("");
      toast({
        title: "Task created!",
        description: "Your new task has been added successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create task. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedText = text.trim();
    if (!trimmedText) return;

    createTaskMutation.mutate({
      text: trimmedText,
      completed: false,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="taskInput" className="sr-only">
              Add new task
            </label>
            <div className="relative">
              <Input
                id="taskInput"
                type="text"
                placeholder="What needs to be done?"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                className="pl-12 py-3 text-base"
                disabled={createTaskMutation.isPending}
                data-testid="input-new-task"
              />
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Plus className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full py-3"
            disabled={createTaskMutation.isPending || !text.trim()}
            data-testid="button-add-task"
          >
            {createTaskMutation.isPending ? "Adding..." : "Add Task"}
          </Button>
        </form>

        {createTaskMutation.isPending && (
          <div className="flex items-center justify-center py-4 mt-4">
            <div className="loading-spinner w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-2 text-muted-foreground">Adding task...</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
