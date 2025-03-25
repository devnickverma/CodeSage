import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { TaskForm } from "@/components/TaskForm";
import { TaskList } from "@/components/TaskList";
import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import { fetchTasks, createTask, updateTask, deleteTask, toggleTaskCompletion, invalidateTasks } from "@/lib/api";
import { Task, TaskFormValues } from "@/lib/types";

export default function TaskPage() {
  const { toast } = useToast();
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deleteTaskId, setDeleteTaskId] = useState<number | null>(null);

  // Fetch tasks
  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["/api/tasks"],
    queryFn: fetchTasks,
  });

  // Create task mutation
  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      invalidateTasks();
      toast({
        title: "Success",
        description: "Task created successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create task",
        variant: "destructive",
      });
    },
  });

  // Update task mutation
  const updateTaskMutation = useMutation({
    mutationFn: ({ id, task }: { id: number; task: Partial<TaskFormValues> }) => 
      updateTask(id, task),
    onSuccess: () => {
      invalidateTasks();
      setEditingTask(null);
      toast({
        title: "Success",
        description: "Task updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update task",
        variant: "destructive",
      });
    },
  });

  // Toggle task completion mutation
  const toggleCompletionMutation = useMutation({
    mutationFn: ({ id, completed }: { id: number; completed: boolean }) => 
      toggleTaskCompletion(id, completed),
    onSuccess: (data) => {
      invalidateTasks();
      toast({
        title: data.completed ? "Task Completed" : "Task Reopened",
        description: data.completed ? "Task marked as completed" : "Task marked as active",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update task status",
        variant: "destructive",
      });
    },
  });

  // Delete task mutation
  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      invalidateTasks();
      setDeleteTaskId(null);
      toast({
        title: "Success",
        description: "Task deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete task",
        variant: "destructive",
      });
    },
  });

  // Event handlers
  const handleSubmit = (values: TaskFormValues) => {
    if (editingTask) {
      updateTaskMutation.mutate({ id: editingTask.id, task: values });
    } else {
      createTaskMutation.mutate(values);
    }
  };

  const handleToggleComplete = (id: number, completed: boolean) => {
    toggleCompletionMutation.mutate({ id, completed });
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  const handleDeleteTask = (id: number) => {
    setDeleteTaskId(id);
  };

  const confirmDelete = () => {
    if (deleteTaskId !== null) {
      deleteTaskMutation.mutate(deleteTaskId);
    }
  };

  // Count tasks for stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;

  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl">
      <header className="mb-8">
        <div className="flex items-center justify-between pb-4 border-b border-gray-200">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Task Management</h1>
            <p className="text-gray-500 mt-1">Organize and track your tasks efficiently</p>
          </div>
          <div className="hidden sm:flex items-center space-x-4">
            <div className="text-sm px-3 py-1 bg-gray-100 rounded-full">
              <span className="font-medium text-gray-700">{totalTasks}</span>
              <span className="text-gray-500"> tasks</span>
            </div>
            <div className="text-sm px-3 py-1 bg-green-100 rounded-full">
              <span className="font-medium text-green-700">{completedTasks}</span>
              <span className="text-green-500"> completed</span>
            </div>
          </div>
        </div>
      </header>

      <div className="lg:grid lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4 mb-8 lg:mb-0">
          <TaskForm 
            task={editingTask} 
            onSubmit={handleSubmit} 
            onCancel={handleCancelEdit} 
          />
        </div>

        <div className="lg:col-span-8">
          <TaskList
            tasks={tasks}
            isLoading={isLoading}
            onToggleComplete={handleToggleComplete}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onCreateFirst={() => document.getElementById("title")?.focus()}
          />
        </div>
      </div>

      <DeleteConfirmation
        isOpen={deleteTaskId !== null}
        onClose={() => setDeleteTaskId(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
