import { ProgressPrismaRepository } from '@/infrastructure/prisma/ProgressPrismaRepository';
import { CanAccessChapter } from './application/CanAccessChapter';
import { EvaluateChapterUnlock } from './application/EvaluateChapterUnlock';
import { GetCourseProgressStats } from './application/GetCourseProgressStats';
import { GetDashboardStats } from './application/GetDashboardStats';
import { GetUserCourseProgress } from './application/GetUserCourseProgress';
import { InitializeUserProgress } from './application/InitializeUserProgress';
import { ProcessAssessmentResult } from './application/ProcessAssessmentResult';
import { UnlockNextChapter } from './application/UnlockNextChapter';
import { UpdateChapterStatus } from './application/UpdateChapterStatus';

const repository = new ProgressPrismaRepository();
const evaluateChapterUnlock = new EvaluateChapterUnlock(repository);
const unlockNextChapter = new UnlockNextChapter(repository, evaluateChapterUnlock);
const updateChapterStatus = new UpdateChapterStatus(repository, unlockNextChapter);

export function makeInitializeUserProgress() {
  return new InitializeUserProgress(repository);
}

export function makeEvaluateChapterUnlock() {
  return evaluateChapterUnlock;
}

export function makeUpdateChapterStatus() {
  return updateChapterStatus;
}

export function makeUnlockNextChapter() {
  return unlockNextChapter;
}

export function makeGetUserCourseProgress() {
  return new GetUserCourseProgress(repository);
}

export function makeGetCourseProgressStats() {
  return new GetCourseProgressStats(repository);
}

export function makeCanAccessChapter() {
  return new CanAccessChapter(repository);
}

export function makeProcessAssessmentResult() {
  return new ProcessAssessmentResult(repository, updateChapterStatus);
}

export function makeGetDashboardStats() {
  return new GetDashboardStats(repository);
}

export function makeProgressRepository() {
  return repository;
}
