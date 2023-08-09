import {
  CompositePropagator,
  W3CTraceContextPropagator,
  W3CBaggagePropagator
} from '@opentelemetry/core';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { JaegerPropagator } from '@opentelemetry/propagator-jaeger';
import { B3InjectEncoding, B3Propagator } from '@opentelemetry/propagator-b3';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { AsyncLocalStorageContextManager } from '@opentelemetry/context-async-hooks';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';

const otelSDK = new NodeSDK({
  metricReader: new PrometheusExporter({ port: 8081 }),
  spanProcessor: new BatchSpanProcessor(new OTLPTraceExporter()),
  contextManager: new AsyncLocalStorageContextManager(),
  textMapPropagator: new CompositePropagator({
    propagators: [
      new JaegerPropagator(),
      new W3CTraceContextPropagator(),
      new W3CBaggagePropagator(),
      new B3Propagator(),
      new B3Propagator({
        injectEncoding: B3InjectEncoding.MULTI_HEADER
      })
    ]
  }),
  instrumentations: [getNodeAutoInstrumentations()]
});

export default otelSDK;

// You can also use the shutdown method to gracefully shut down the SDK before process shutdown
// or on some operating system signal.
// TODO: Errors with "TypeError: process.on is not a function"... Node? Hello??
// process.on('SIGTERM', () => {
//   otelSDK
//     .shutdown()
//     .then(
//       // eslint-disable-next-line no-console
//       () => console.log('SDK shut down successfully'),
//       // eslint-disable-next-line no-console
//       (error) => console.log('Error shutting down SDK', error)
//     )
//     .finally(() => process.exit(0));
// });
