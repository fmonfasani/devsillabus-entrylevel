import { Injectable, Logger } from '@nestjs/common';
import Stripe from 'stripe';
import fetch from 'node-fetch';

@Injectable()
export class BillingService {
  private readonly logger = new Logger(BillingService.name);
  private readonly stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-10-16' });

  async createCheckoutSession(orgId: string, priceId: string) {
    const baseUrl = process.env.WEB_ORIGIN ?? 'http://localhost:3000';
    const session = await this.stripe.checkout.sessions.create({
      mode: 'subscription',
      success_url: `${baseUrl}/billing/success`,
      cancel_url: `${baseUrl}/billing/cancel`,
      line_items: [{ price: priceId, quantity: 1 }],
      metadata: { org_id: orgId },
    });
    return session.url;
  }

  async recordUsage(orgId: string, metric: string, quantity: number) {
    const apiUrl = process.env.API_URL ?? 'http://localhost:3333';
    const response = await fetch(`${apiUrl}/v1/usage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-org-id': orgId },
      body: JSON.stringify({ metric, quantity }),
    });
    if (!response.ok) {
      this.logger.error('Failed to record usage');
    }
  }
}
