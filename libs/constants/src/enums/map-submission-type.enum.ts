import { MapSubmissionType as PrismaMapSubmissionType } from '@prisma/client';
import { assertType } from '../types/utils/assert-type.function';
import { AreTypeKeysEqual } from '../types/utils/is-type-equal';

// prettier-ignore
export enum MapSubmissionType {
  ORIGINAL = 0, // A Momentum original, made by the submitter
  PORT = 1,     // Port from another game, usually not by submitter but can be
  SPECIAL = 2   // Any weird cases, such as maps only added for events
}

// This type-assertion ensures that the above enum is always kept up-to-date
// with the enum living in Postgres. We could re-export that from the Prisma
// schema, but that's an Object not an enum, so using enums for consistency.
// If the keys on are not identical, this function expression will be an error
// at compile time.
assertType<
  AreTypeKeysEqual<typeof MapSubmissionType, typeof PrismaMapSubmissionType>
>();
