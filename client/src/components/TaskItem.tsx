import { useState } from "react";
import { Task } from "@/lib/types";
import { CheckIcon, PencilIcon, TrashIcon } from "lucide-react";

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: number, completed: boolean) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

export function TaskItem({ task, onToggleComplete, onEdit, onDelete }: TaskItemProps) {
  const { id, title, description, completed } = task;

  return (
    <div className="task-item p-4 hover:bg-gray-50 transition" data-task-id={id}>
      <div className="flex items-start">
        <button
          className={`flex-shrink-0 w-5 h-5 mr-3 mt-1 rounded-full border-2 
            ${completed 
              ? "bg-green-500 border-green-500 hover:border-green-600" 
              : "border-gray-300 hover:border-primary-500"} 
            focus:outline-none focus:ring-2 focus:ring-primary-500 transition`}
          onClick={() => onToggleComplete(id, !completed)}
          aria-label={completed ? "Mark as incomplete" : "Mark as complete"}
        >
          {completed && (
            <CheckIcon className="w-full h-full text-white" strokeWidth={2} />
          )}
        </button>
        <div className="flex-1 min-w-0">
          <h3 
            className={`text-base font-medium mb-1 ${completed ? "text-gray-500 line-through" : "text-gray-800"}`}
          >
            {title}
          </h3>
          {description && (
            <p 
              className={`text-sm ${completed ? "text-gray-500 line-through" : "text-gray-600"}`}
            >
              {description}
            </p>
          )}
        </div>
        <div className="ml-4 flex-shrink-0 flex">
          <button
            className={`p-1 ${completed ? "text-gray-400" : "text-gray-500"} hover:text-primary-600 focus:outline-none focus:text-primary-600 transition`}
            onClick={() => onEdit(task)}
            aria-label="Edit task"
          >
            <PencilIcon className="h-5 w-5" />
          </button>
          <button
            className={`p-1 ${completed ? "text-gray-400" : "text-gray-500"} hover:text-red-600 focus:outline-none focus:text-red-600 transition`}
            onClick={() => onDelete(id)}
            aria-label="Delete task"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
