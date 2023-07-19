import { MapTestingRequestResponse as PrismaMapTestingRequestResponse } from '@prisma/client';
import { assertType } from '../types/utils/assert-type.function';
import { AreTypeKeysEqual } from '../types/utils/is-type-equal';

export enum MapTestingRequestResponse {
  UNREAD,
  ACCEPTED,
  DECLINED
}

assertType<
  AreTypeKeysEqual<
    typeof MapTestingRequestResponse,
    typeof PrismaMapTestingRequestResponse
  >
>();
