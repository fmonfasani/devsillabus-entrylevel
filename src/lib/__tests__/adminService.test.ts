// src/lib/__tests__/adminService.test.ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as adminService from '../adminService';
import prisma from '@/lib/prisma';

test('createCourse uses prisma.course.create', async () => {
  let called = false;
  (prisma.course.create as any) = async () => {
    called = true;
    return { id: 1 } as any;
  };
  await adminService.createCourse({
    name: 'Test',
    slug: 'test',
    type: 'FULLSTACK' as any,
    level: 'ENTRY_LEVEL' as any,
  });
  assert.equal(called, true);
});
