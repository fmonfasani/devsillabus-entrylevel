import { Body, Controller, Headers, Post, Req } from '@nestjs/common';
import Stripe from 'stripe';
import { BillingService } from './billing.service';

@Controller('billing')
export class StripeController {
  private readonly stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-10-16' });

  constructor(private readonly billing: BillingService) {}

  @Post('checkout')
  async checkout(@Body() body: { orgId: string; priceId: string }) {
    const url = await this.billing.createCheckoutSession(body.orgId, body.priceId);
    return { url };
  }

  @Post('webhooks/stripe')
  async handleWebhook(@Req() req: any, @Headers('stripe-signature') signature: string) {
    const buf = req.rawBody;
    const event = this.stripe.webhooks.constructEvent(buf, signature, process.env.WEBHOOK_SECRET_STRIPE!);

    switch (event.type) {
      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        await this.billing.recordUsage(invoice.metadata?.org_id ?? '', 'invoice_payment', 1);
        break;
      }
      default:
        break;
    }

    return { received: true };
  }
}
