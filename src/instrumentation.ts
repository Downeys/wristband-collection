import { Logger } from 'pino';
import { Registry } from 'prom-client';
import { registerOTel } from '@vercel/otel';

declare global {
  // var usage is required for global declaration
  var logger: Logger | undefined;
  var metrics:
    | {
        registry: Registry;
      }
    | undefined;
}

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const pino = (await import('pino')).default;
    const pinoLoki = (await import('pino-loki')).default;

    const transport = pinoLoki({
      host: 'http://localhost:3100', // Loki server address
      batching: true, // Enable batching of logs for better performance
      interval: 5, // Send logs every 5 seconds when batching
      labels: { service: process.env.OTEL_SERVICE_NAME ?? 'next-frontend' }, // Add application label to all logs
    });

    const logger = pino(transport);
    globalThis.logger = logger;
    const promClient = (await import('prom-client')).default;

    const prometheusRegistry = new promClient.Registry();
    promClient.collectDefaultMetrics({
      register: prometheusRegistry,
    });

    globalThis.metrics = {
      registry: prometheusRegistry,
    };

    registerOTel();
  }
}
