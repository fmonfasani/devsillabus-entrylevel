import test from 'node:test';
import assert from 'node:assert';
import request from 'supertest';
import { app } from '../src/app.js';

test('GET /health -> 200 { ok: true }', async () => {
  const res = await request(app).get('/health');
  assert.equal(res.status, 200);
  assert.deepEqual(res.body, { ok: true });
});
