const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const { performance } = require('perf_hooks');

test('TTI simplificado menor a 1s', () => {
  const start = performance.now();
  const html = fs.readFileSync(path.join(__dirname, '../src/index.html'), 'utf8');
  new JSDOM(html);
  const tti = performance.now() - start;
  expect(tti).toBeLessThan(1000);
});
