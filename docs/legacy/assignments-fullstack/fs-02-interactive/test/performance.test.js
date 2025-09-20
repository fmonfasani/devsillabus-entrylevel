import test from 'node:test';
import assert from 'node:assert';
import { JSDOM } from 'jsdom';
import fs from 'node:fs';
import { performance } from 'node:perf_hooks';
import { init } from '../src/app.js';

function setupDom() {
  const html = fs.readFileSync(new URL('../src/index.html', import.meta.url), 'utf8');
  const dom = new JSDOM(html, { runScripts: 'outside-only' });
  const api = init(dom.window.document);
  return { dom, ...api };
}

test('addTodo 1000 items < 50ms', () => {
  const { addTodo } = setupDom();
  const start = performance.now();
  for (let i = 0; i < 1000; i++) {
    addTodo(`tarea ${i}`);
  }
  const duration = performance.now() - start;
  assert.ok(duration < 50, `tardó ${duration}ms`);
});
