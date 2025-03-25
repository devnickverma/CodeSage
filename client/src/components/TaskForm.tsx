import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { Task, taskFormSchema, TaskFormValues } from "@/lib/types";
import { PlusIcon } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface TaskFormProps {
  task?: Task | null;
  onSubmit: (values: TaskFormValues) => void;
  onCancel: () => void;
}

export function TaskForm({ task, onSubmit, onCancel }: TaskFormProps) {
  const isEditing = !!task;

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: task?.title || "",
      description: task?.description || "",
      completed: task?.completed || false,
    },
  });

  // Update form values when editing task changes
  useEffect(() => {
    if (task) {
      form.reset({
        title: task.title,
        description: task.description || "",
        completed: task.completed,
      });
    } else {
      form.reset({
        title: "",
        description: "",
        completed: false,
      });
    }
  }, [task, form]);

  return (
    <div className="bg-white rounded-lg shadow p-6 sticky top-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        {isEditing ? "Edit Task" : "Add New Task"}
      </h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">Title</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter task title" 
                    {...field} 
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-600" />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">Description (optional)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Enter task details" 
                    rows={3} 
                    {...field} 
                    value={field.value || ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex items-center justify-between">
            <Button 
              type="submit" 
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition"
            >
              {!isEditing && <PlusIcon className="h-4 w-4 mr-2" />}
              {isEditing ? "Update Task" : "Add Task"}
            </Button>
            
            {isEditing && (
              <Button 
                type="button" 
                variant="ghost" 
                onClick={onCancel} 
                className="text-sm text-gray-600 hover:text-gray-800 focus:outline-none transition"
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </Form>
      
      <div className="mt-5 pt-5 border-t border-gray-200">
        <div className="flex items-center text-sm text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Fill in task details and click {isEditing ? "Update Task" : "Add Task"}</span>
        </div>
      </div>
    </div>
  );
}
