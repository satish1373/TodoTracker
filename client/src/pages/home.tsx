import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Task } from "@shared/schema";
import TaskInput from "@/components/task-input";
import TaskFilters from "@/components/task-filters";
import TaskList from "@/components/task-list";
import TaskStats from "@/components/task-stats";
import DeleteConfirmationDialog from "@/components/delete-confirmation-dialog";
import { CheckSquare } from "lucide-react";

type FilterType = "all" | "active" | "completed";

export default function Home() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  const {
    data: tasks = [],
    isLoading,
    error
  } = useQuery<Task[]>({
    queryKey: ["/api/tasks"],
  });

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const stats = {
    total: tasks.length,
    active: tasks.filter(t => !t.completed).length,
    completed: tasks.filter(t => t.completed).length,
    completionPercentage: tasks.length > 0 ? Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100) : 0
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive mb-2">Error Loading Tasks</h1>
          <p className="text-muted-foreground">Failed to load your tasks. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-6 sm:px-6">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <CheckSquare className="text-primary-foreground h-5 w-5" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">TaskFlow</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-8 sm:px-6">
        <TaskInput />
        
        <TaskFilters 
          currentFilter={filter} 
          onFilterChange={setFilter}
          stats={stats}
        />

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="loading-spinner w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-3 text-muted-foreground">Loading tasks...</span>
          </div>
        ) : (
          <TaskList 
            tasks={filteredTasks}
            onDeleteTask={setTaskToDelete}
          />
        )}

        <TaskStats stats={stats} />
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16">
        <div className="max-w-2xl mx-auto px-4 py-8 sm:px-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Built with ❤️ for productivity enthusiasts
            </p>
            <div className="flex items-center justify-center space-x-6 mt-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span>⌨️</span>
                <span>Press Enter to add tasks quickly</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span>📱</span>
                <span>Mobile optimized</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <DeleteConfirmationDialog
        isOpen={!!taskToDelete}
        onClose={() => setTaskToDelete(null)}
        onConfirm={() => {
          // This will be handled by the DeleteConfirmationDialog component
          setTaskToDelete(null);
        }}
        taskId={taskToDelete}
      />
    </div>
  );
}
