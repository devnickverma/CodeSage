import { useState } from "react";
import { Task, TaskStatus } from "@/lib/types";
import { TaskItem } from "./TaskItem";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

interface TaskListProps {
  tasks: Task[];
  isLoading: boolean;
  onToggleComplete: (id: number, completed: boolean) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onCreateFirst: () => void;
}

export function TaskList({ 
  tasks, 
  isLoading, 
  onToggleComplete, 
  onEdit, 
  onDelete,
  onCreateFirst
}: TaskListProps) {
  const [filter, setFilter] = useState<TaskStatus>("all");

  const filteredTasks = tasks.filter(task => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-5">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-800">Your Tasks</h2>
        <div className="flex space-x-2">
          <Button
            variant={filter === "all" ? "outline" : "ghost"}
            size="sm"
            onClick={() => setFilter("all")}
            className={`px-3 py-1 text-sm rounded-md ${
              filter === "all" 
                ? "bg-primary-50 text-primary-700 border-primary-300" 
                : "text-gray-600 bg-white border border-gray-300 hover:bg-gray-50"
            }`}
          >
            All
          </Button>
          <Button
            variant={filter === "active" ? "outline" : "ghost"}
            size="sm"
            onClick={() => setFilter("active")}
            className={`px-3 py-1 text-sm rounded-md ${
              filter === "active" 
                ? "bg-primary-50 text-primary-700 border-primary-300" 
                : "text-gray-600 bg-white border border-gray-300 hover:bg-gray-50"
            }`}
          >
            Active
          </Button>
          <Button
            variant={filter === "completed" ? "outline" : "ghost"}
            size="sm"
            onClick={() => setFilter("completed")}
            className={`px-3 py-1 text-sm rounded-md ${
              filter === "completed" 
                ? "bg-primary-50 text-primary-700 border-primary-300" 
                : "text-gray-600 bg-white border border-gray-300 hover:bg-gray-50"
            }`}
          >
            Completed
          </Button>
        </div>
      </div>
      
      {isLoading ? (
        <div className="p-8 text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 mx-auto"></div>
          </div>
        </div>
      ) : (
        <>
          {filteredTasks.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {filteredTasks.map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggleComplete={onToggleComplete}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </div>
          ) : (
            <div id="emptyState" className="p-8 text-center">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No tasks found</h3>
              <p className="text-gray-500 mb-4">
                {filter === "all" ? "Get started by creating your first task" : 
                 filter === "active" ? "No active tasks found" : "No completed tasks found"}
              </p>
              {filter === "all" && (
                <Button 
                  onClick={onCreateFirst}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition"
                >
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add a task
                </Button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
