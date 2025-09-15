import { Badge } from "@/components/ui/badge";

type FilterType = "all" | "active" | "completed";

interface TaskFiltersProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  stats: {
    total: number;
    active: number;
    completed: number;
  };
}

export default function TaskFilters({ currentFilter, onFilterChange, stats }: TaskFiltersProps) {
  const filters = [
    { key: "all", label: "All Tasks", count: stats.total },
    { key: "active", label: "Active", count: stats.active },
    { key: "completed", label: "Completed", count: stats.completed },
  ] as const;

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2 p-1 bg-muted rounded-lg">
        {filters.map((filter) => (
          <button
            key={filter.key}
            onClick={() => onFilterChange(filter.key)}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 flex items-center justify-center gap-2 ${
              currentFilter === filter.key
                ? "bg-primary text-primary-foreground"
                : "hover:bg-background text-foreground"
            }`}
            data-testid={`filter-${filter.key}`}
          >
            {filter.label}
            <Badge
              variant={currentFilter === filter.key ? "secondary" : "outline"}
              className="text-xs"
            >
              {filter.count}
            </Badge>
          </button>
        ))}
      </div>
    </div>
  );
}
