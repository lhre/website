/**
 * Causes a Typescript error iff T is `never`.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-function
export function assertType<T extends never>() {}
