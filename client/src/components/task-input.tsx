import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { InsertTask } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select"; 
import { Card, CardContent } from "@/components/ui/card";
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css"; 

const categories = ["Work", "Personal", "Shopping", "Other"];

export default function TaskInput({ tasks }) {
  const [text, setText] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [dueDate, setDueDate] = useState<Date | null>(null); 
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
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
      setCategory(categories[0]);
      setDueDate(null); 
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
      category: category,
      dueDate: dueDate ? dueDate.toISOString() : null, 
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesText = task.text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || (filterStatus === "completed" && task.completed) || (filterStatus === "pending" && !task.completed);
    return matchesText && matchesStatus;
  });

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
          <div>
            <label htmlFor="categorySelect" className="sr-only">
              Select category
            </label>
            <Select
              id="categorySelect"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="py-3"
              disabled={createTaskMutation.isPending}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <label htmlFor="dueDate" className="sr-only">
              Select due date
            </label>
            <DatePicker
              id="dueDate"
              selected={dueDate}
              onChange={(date) => setDueDate(date)}
              className="py-3 border rounded-md w-full"
              placeholderText="Select due date"
              dateFormat="MMMM d, yyyy"
              isClearable
              disabled={createTaskMutation.isPending}
            />
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

        <div className="mt-4">
          <Input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4"
          />
          <div className="flex space-x-2 mb-4">
            <Button onClick={() => setFilterStatus("all")} variant={filterStatus === "all" ? "outline" : "default"}>All</Button>
            <Button onClick={() => setFilterStatus("completed")} variant={filterStatus === "completed" ? "outline" : "default"}>Completed</Button>
            <Button onClick={() => setFilterStatus("pending")} variant={filterStatus === "pending" ? "outline" : "default"}>Pending</Button>
          </div>
          <div>
            {filteredTasks.map(task => (
              <div key={task.id} className="flex items-center justify-between p-2 border-b">
                <span className={`flex-1 ${task.completed ? "line-through" : ""}`}>  
                  {task.text.replace(new RegExp(`(${searchTerm})`, 'gi'), (match) => `<span class="bg-yellow-200">${match}</span>`)}
                </span>
                <Button onClick={() => {/* handle complete task */}}>{task.completed ? "Undo" : "Complete"}</Button>
              </div>
            ))}
          </div>
        </div>

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