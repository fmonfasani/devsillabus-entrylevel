import { Injectable, Logger } from '@nestjs/common';
import fetch from 'node-fetch';

@Injectable()
export class PosthogService {
  private readonly logger = new Logger(PosthogService.name);

  async capture(event: string, distinctId: string, properties: Record<string, unknown> = {}) {
    const response = await fetch(`${process.env.POSTHOG_HOST ?? 'https://app.posthog.com'}/capture/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: process.env.POSTHOG_API_KEY,
        event,
        distinct_id: distinctId,
        properties,
      }),
    });

    if (!response.ok) {
      this.logger.warn(`PostHog capture failed: ${response.statusText}`);
    }
  }
}
