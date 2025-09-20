import { Queue, Worker } from 'bullmq';
import Redis from 'ioredis';

const connection = new Redis(process.env.REDIS_URL ?? 'redis://localhost:6379');

export const emailQueue = new Queue('emailQueue', { connection });

export const emailWorker = new Worker(
  'emailQueue',
  async (job) => {
    switch (job.name) {
      case 'welcome-email':
        // Implementar envío via Resend
        break;
      case 'invoice-failed':
        break;
      default:
        break;
    }
  },
  { connection }
);

emailWorker.on('completed', (job) => {
  console.log(`Job ${job.id} completado`);
});

emailWorker.on('failed', (job, err) => {
  console.error(`Job ${job?.id} falló`, err);
});
