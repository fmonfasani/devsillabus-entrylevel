const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const { axe, toHaveNoViolations } = require('jest-axe');

expect.extend(toHaveNoViolations);

const html = fs.readFileSync(path.join(__dirname, '../src/index.html'), 'utf8');
const dom = new JSDOM(html);

it('incluye meta tags básicos', () => {
  const { document } = dom.window;
  expect(document.querySelector('meta[charset="UTF-8"]')).not.toBeNull();
  expect(document.querySelector('meta[name="description"]')).not.toBeNull();
});

it('define viewport responsive', () => {
  const { document } = dom.window;
  const viewport = document.querySelector('meta[name="viewport"]');
  expect(viewport).not.toBeNull();
  expect(viewport.getAttribute('content')).toMatch(/width=device-width/);
});

it('no tiene violaciones de accesibilidad', async () => {
  const results = await axe(dom.window.document);
  expect(results).toHaveNoViolations();
});
