// src/schemas/admin.ts
import { z } from "zod";
import { CourseType, CourseLevel, ResourceType, AssessmentType } from "@prisma/client";

export const courseCreateSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().optional(),
  type: z.nativeEnum(CourseType),
  level: z.nativeEnum(CourseLevel),
  initWeeks: z.boolean().optional().default(true),
});

export const resourceCreateSchema = z.object({
  type: z.nativeEnum(ResourceType),
  title: z.string().min(1),
  url: z.string().url().optional(),
  content: z.string().optional(),
  isRequired: z.boolean().optional().default(false),
});

export const assessmentCreateSchema = z.object({
  type: z.nativeEnum(AssessmentType),
  title: z.string().min(1),
  instructions: z.string().optional(),
  passingScore: z.number().int().min(0).max(100).default(70),
  maxAttempts: z.number().int().optional(),
  timeLimitMinutes: z.number().int().optional(),
  questions: z.any().array().optional(),
});
