// src/lib/__tests__/courseService.test.ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as courseService from '../courseService';
import prisma from '@/lib/prisma';

test('listCourses calls prisma.course.findMany', async () => {
  let called = false;
  (prisma.course.findMany as any) = async () => {
    called = true;
    return [];
  };
  await courseService.listCourses();
  assert.equal(called, true);
});
