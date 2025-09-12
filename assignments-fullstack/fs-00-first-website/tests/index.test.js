import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcDir = path.resolve(__dirname, '../src');

const html = fs.readFileSync(path.join(srcDir, 'index.html'), 'utf8');

test('HTML links CSS', () => {
  assert.ok(html.includes('<link rel="stylesheet" href="style.css">'));
});

test('HTML links JS', () => {
  assert.ok(html.includes('<script src="script.js"></script>'));
});

test('CSS file exists', () => {
  assert.ok(fs.existsSync(path.join(srcDir, 'style.css')));
});

test('JS file exists', () => {
  assert.ok(fs.existsSync(path.join(srcDir, 'script.js')));
});
