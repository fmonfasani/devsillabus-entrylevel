import { Body, Controller, Headers, Post, Req } from '@nestjs/common';
import crypto from 'node:crypto';
import { BillingService } from './billing.service';

@Controller('billing')
export class MercadoPagoController {
  constructor(private readonly billing: BillingService) {}

  @Post('webhooks/mercadopago')
  async handleWebhook(@Req() req: any, @Headers('x-signature') signature: string, @Body() body: any) {
    const hmac = crypto.createHmac('sha256', process.env.WEBHOOK_SECRET_MP!);
    hmac.update(req.rawBody);
    const digest = hmac.digest('hex');

    if (digest !== signature) {
      return { verified: false };
    }

    const event = body;
    if (event.type === 'payment' && event.data?.id) {
      await this.billing.recordUsage(event.data.metadata?.org_id ?? '', 'payment_processed', 1);
    }

    return { received: true };
  }
}
