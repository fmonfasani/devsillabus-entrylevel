import test from 'node:test';
import assert from 'node:assert';
import { JSDOM } from 'jsdom';
import fs from 'node:fs';
import { init } from '../src/app.js';

function setupDom() {
  const html = fs.readFileSync(new URL('../src/index.html', import.meta.url), 'utf8');
  const dom = new JSDOM(html, { runScripts: 'outside-only' });
  const api = init(dom.window.document);
  return { dom, ...api };
}

test('agregar tarea con clic', () => {
  const { dom } = setupDom();
  const input = dom.window.document.getElementById('new-todo');
  const button = dom.window.document.getElementById('add-todo');
  input.value = 'Estudiar';
  button.click();
  assert.equal(dom.window.document.querySelectorAll('#todo-list li').length, 1);
});

test('roles ARIA correctos', () => {
  const { addTodo, list } = setupDom();
  addTodo('Leer');
  assert.equal(list.getAttribute('role'), 'list');
  const item = list.querySelector('li');
  assert.equal(item.getAttribute('role'), 'listitem');
});

test('Enter en input agrega tarea', () => {
  const { dom, list } = setupDom();
  const input = dom.window.document.getElementById('new-todo');
  input.value = 'Dormir';
  input.dispatchEvent(new dom.window.KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
  assert.equal(list.children.length, 1);
});

test('Espacio o Enter alterna checkbox', () => {
  const { dom, addTodo, list } = setupDom();
  addTodo('Correr');
  const checkbox = list.querySelector('input[type="checkbox"]');
  checkbox.dispatchEvent(new dom.window.KeyboardEvent('keydown', { key: ' ', bubbles: true }));
  assert.equal(checkbox.checked, true);
  checkbox.dispatchEvent(new dom.window.KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
  assert.equal(checkbox.checked, false);
});
