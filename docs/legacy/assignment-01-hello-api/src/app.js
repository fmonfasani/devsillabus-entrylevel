import express from 'express';

export const app = express();

app.get('/health', (req, res) => {
  res.status(200).json({ ok: true });
});
