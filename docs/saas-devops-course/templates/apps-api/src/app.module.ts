import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StripeController } from './payments/stripe.controller';
import { MercadoPagoController } from './payments/mercadopago.controller';
import { BillingService } from './payments/billing.service';
import { PosthogService } from './analytics/posthog.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [StripeController, MercadoPagoController],
  providers: [BillingService, PosthogService],
})
export class AppModule {}
