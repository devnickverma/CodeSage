import { queryClient, apiRequest } from "@/lib/queryClient";
import { Task, TaskFormValues } from "./types";

// API endpoints
const TASKS_ENDPOINT = "/api/tasks";

// Task API functions
export async function fetchTasks(): Promise<Task[]> {
  const response = await fetch(TASKS_ENDPOINT, { credentials: "include" });
  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }
  return response.json();
}

export async function createTask(task: TaskFormValues): Promise<Task> {
  const response = await apiRequest("POST", TASKS_ENDPOINT, task);
  return response.json();
}

export async function updateTask(id: number, task: Partial<TaskFormValues>): Promise<Task> {
  const response = await apiRequest("PUT", `${TASKS_ENDPOINT}/${id}`, task);
  return response.json();
}

export async function toggleTaskCompletion(id: number, completed: boolean): Promise<Task> {
  return updateTask(id, { completed });
}

export async function deleteTask(id: number): Promise<void> {
  await apiRequest("DELETE", `${TASKS_ENDPOINT}/${id}`);
}

// Cache invalidation
export function invalidateTasks() {
  return queryClient.invalidateQueries({ queryKey: [TASKS_ENDPOINT] });
}
