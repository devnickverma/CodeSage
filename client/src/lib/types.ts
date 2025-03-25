import { z } from "zod";

export type TaskStatus = "all" | "active" | "completed";

export interface Task {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
}

export const taskFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().nullable().optional(),
  completed: z.boolean().optional(),
});

export type TaskFormValues = z.infer<typeof taskFormSchema>;
