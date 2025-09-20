import prisma from "@/lib/prisma";
import { ChapterLifecycleService } from "@/modules/progress/application/ChapterLifecycleService";
import { ProgressAnalyticsService } from "@/modules/progress/application/ProgressAnalyticsService";
import {
  PrismaAssessmentRepository,
  PrismaChapterProgressRepository,
  PrismaCourseProgressReadModel,
} from "@/infrastructure/prisma/progress";
import { ProgressStatus } from "@prisma/client";

const chapterProgressRepository = new PrismaChapterProgressRepository(prisma);
const assessmentRepository = new PrismaAssessmentRepository(prisma);
const courseProgressReadModel = new PrismaCourseProgressReadModel(prisma);

export const chapterLifecycleService = new ChapterLifecycleService(
  chapterProgressRepository,
  assessmentRepository,
  courseProgressReadModel
);

export const progressAnalyticsService = new ProgressAnalyticsService(
  chapterProgressRepository,
  courseProgressReadModel
);

export { ProgressStatus };
