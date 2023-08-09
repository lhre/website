import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ExceptionHandlerFilter } from './filters/exception-handler.filter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FastifyMulterModule } from '@nest-lab/fastify-multer';
import { ConfigFactory, Environment, validate } from '@momentum/backend/config';
import { SentryModule } from './modules/sentry/sentry.module';
import { AuthModule } from './modules/auth/auth.module';
import { ActivitiesModule } from './modules/activities/activities.module';
import { AdminModule } from './modules/admin/admin.module';
import { MapsModule } from './modules/maps/maps.module';
import { RanksModule } from './modules/ranks/ranks.module';
import { ReportsModule } from './modules/reports/reports.module';
import { RunsModule } from './modules/runs/runs.module';
import { StatsModule } from './modules/stats/stats.module';
import { UserModule } from './modules/user/user.module';
import { UsersModule } from './modules/users/users.module';
import { SessionModule } from './modules/session/session.module';
import { XpSystemsModule } from './modules/xp-systems/xp-systems.module';
import { OpenTelemetryModule } from 'nestjs-otel';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    ConfigModule.forRoot({
      // envFilePath: '../.env',
      load: [ConfigFactory],
      cache: true,
      isGlobal: true,
      validate
    }),

    // We use Sentry in production to store all major errors caught by the
    // ExceptionHandlerFilter. This is a small wrapper module around
    // @sentry/node that only inits in production if a valid DSN is set.
    SentryModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        environment: config.get('env'),
        sentryOpts: {
          dsn: config.get('sentry.dsn'),
          debug: false,
          tracesSampleRate: 1
        }
      }),
      inject: [ConfigService]
    }),

    // TODO: explain this and figure out how to not launch at all in prod
    OpenTelemetryModule.forRoot({
      metrics: {
        hostMetrics: true, // Includes Host Metrics
        apiMetrics: {
          enable: true, // Includes api metrics
          defaultAttributes: {
            // You can set default labels for api metrics
            custom: 'Sasuasge'
          },
          ignoreRoutes: ['/favicon.ico'], // You can ignore specific routes (See https://docs.nestjs.com/middleware#excluding-routes for options)
          ignoreUndefinedRoutes: false //Records metrics for all URLs, even undefined ones
        }
      }
    }),

    // Pino is a highly performant logger that outputs logs as JSON, which we
    // then export to Grafana Loki. This module sets up `pino-http` which logs
    // all HTTP requests (so no need for a Nest interceptor).
    // In dev mode, outputs as more human-readable strings using `pino-pretty`.
    LoggerModule.forRootAsync({
      // TODO: We want this.logger.error to also send to Sentry!!
      // Can probably override nestjs-pino's error method?
      useFactory: async (config: ConfigService) => ({
        pinoHttp: {
          customProps: (_req, _res) => ({ context: 'HTTP' }),
          transport:
            config.get('env') !== Environment.PRODUCTION
              ? {
                  target: 'pino-pretty',
                  options: { singleLine: true }
                }
              : undefined
        }
      }),
      inject: [ConfigService]
    }),
    FastifyMulterModule,
    AuthModule,
    ActivitiesModule,
    AdminModule,
    MapsModule,
    RanksModule,
    ReportsModule,
    RunsModule,
    StatsModule,
    UserModule,
    UsersModule,
    SessionModule,
    XpSystemsModule
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ExceptionHandlerFilter
    }
  ]
})
export class AppModule {}
