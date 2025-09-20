import posthog from 'posthog-js';

export function initPostHog() {
  if (typeof window === 'undefined') return;
  if (posthog.__loaded) return;
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://app.posthog.com',
    loaded: (client) => {
      if (process.env.NODE_ENV === 'development') {
        client.debug();
      }
    },
  });
}

export function capture(event: string, properties?: Record<string, unknown>) {
  posthog.capture(event, properties);
}
