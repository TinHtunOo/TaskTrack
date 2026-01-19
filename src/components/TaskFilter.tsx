import type { Task } from "../types/task";

interface Props {
  priority: Task["priority"] | "all";
  setPriority: (v: Task["priority"] | "all") => void;
  sort: string;
  setSort: (v: string) => void;
}

const priorityOptions = [
  { value: "all", label: "all" },
  { value: "low", label: "low" },
  { value: "medium", label: "medium" },
  { value: "high", label: "high" },
];

const sortOptions = [
  { value: "created-desc", label: "newest first" },
  { value: "created-asc", label: "oldest first" },
  { value: "priority-desc", label: "high priority first" },
  { value: "priority-asc", label: "low priority first" },
];

const TaskFilter = ({ priority, setPriority, sort, setSort }: Props) => {
  return (
    <div className="flex flex-col gap-4 mt-15 w-45 text-gray-900 dark:text-white">
      <div className="flex flex-col ">
        <label className="font-semibold mb-2 flex items-center gap-2">
          Priority{" "}
          <span className="border inline-block w-full border-gray-400 dark:border-gray-600"></span>
        </label>
        {priorityOptions.map((option) => (
          <label
            key={option.value}
            className="flex items-center  text-sm gap-2 mb-1 "
          >
            <input
              type="radio"
              name="priority"
              value={option.value}
              checked={priority === option.value}
              onChange={(e) =>
                setPriority(e.target.value as Task["priority"] | "all")
              }
              className="accent-gray-600 dark:accent-gray-400"
            />
            {option.label}
          </label>
        ))}
      </div>
      <div className="flex flex-col">
        <label className="font-semibold mb-2 flex items-center gap-2">
          Sort{" "}
          <span className="border inline-block w-full border-gray-400 dark:border-gray-600"></span>
        </label>
        {sortOptions.map((option) => (
          <label
            key={option.value}
            className="flex items-center text-sm gap-2 mb-1"
          >
            <input
              type="radio"
              name="sort"
              value={option.value}
              checked={sort === option.value}
              onChange={(e) => setSort(e.target.value)}
              className="accent-gray-600 dark:accent-gray-400"
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default TaskFilter;
