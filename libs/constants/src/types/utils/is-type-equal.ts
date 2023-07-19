/**
 * Resolves to `never` iff types are not identical.
 * Note: `type-fest` provides an `IsEqual` which is similar, but resolves to
 * `true` if identical, otherwise `false`. We want `never` so we can do
 * compile-time type assertions.
 */
export type IsTypeEqual<A, B> = Exclude<A, B> | Exclude<B, A>;

/**
 * Resolves to `never` iff keys on type are not identical.
 */
export type AreTypeKeysEqual<A, B> = IsTypeEqual<keyof A, keyof B>;
