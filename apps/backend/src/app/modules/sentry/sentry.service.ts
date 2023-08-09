import { Injectable } from '@nestjs/common';
import '@sentry/tracing'; // https://github.com/getsentry/sentry-javascript/issues/4731#issuecomment-1126157027
import * as Sentry from '@sentry/node';

@Injectable()
export class SentryService {
  sendError(exception: any): string {
    //
    const transaction = Sentry.startTransaction({
      op: 'API Error',
      name: exception
    });

    Sentry.getCurrentHub().configureScope((scope) => {
      scope.setSpan(transaction);

      scope.setContext('API Error', null);
    });

    const result: string = Sentry.captureException(exception);

    transaction.finish();

    return result;
  }
}
