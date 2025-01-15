import type { z } from 'zod'

//
// ASSERTS
//

/**
 * Example:
 * ```ts
 * const x: any = f()
 * assert(typeof x === 'string')
 * x // TS infers x is string
 * ```
 */
export function assert(condition: boolean, msg?: string): asserts condition {
  if (!condition) {
    throw new Error(msg ?? 'AssertionError')
  }
}

/**
 * Assert that a union type has been narrowed to `never`.
 * It's convenient to call this in the default branch of a switch statement.
 */
export function assertNever(val: never): never {
  throw new Error(`Expected to be unreachable. Value: ${JSON.stringify(val)}`)
}

/**
 * Example:
 * ts```
 * let x: unknown
 * assertZ(z.number(), x)
 * x // TS infers X is number
 * ```
 */
export function assertZ<T>(val: unknown, schema: z.Schema<T>): asserts val is T {
  schema.parse(val)
}

//
// AS (inline type narrowing)
//

export function asZ<T>(val: unknown, schema: z.Schema<T>): T {
  return schema.parse(val)
}

// `asString(val)` equiv. `asZ(val, z.string())`
export function asString(val: unknown): string {
  assert(typeof val === 'string')
  return val
}

export function asNotNullish<T>(val: T): NonNullable<T> {
  assert(isNotNullish(val))
  return val
}

//
// IS (conditional type narrowing)
//

export function isNotNullish<T>(val: T): val is NonNullable<T> {
  return val !== undefined && val !== null
}

export function isNonEmptyArray<T>(ts: Array<T>): ts is [T, ...T[]] {
  return ts.length > 0
}

export function isEmptyArray<T>(ts: Array<T>): ts is [] {
  return ts.length === 0
}

export function isArrayOfLength1<T>(ts: Array<T>): ts is [T] {
  return ts.length === 1
}

export function isArrayOfLength2<T>(ts: Array<T>): ts is [T, T] {
  return ts.length === 2
}

/**
 * Determine if a value conforms to a Zod schema.
 *
 * Note, if you are using `.filter`, use the curried version instead:
 * ```
 * // Do this:
 * const relevantValues = values.filter(isZ(RelevantSchema))
 *
 * // Not this:
 * const relevantValues = values.filter(value => isZ(RelevantSchema, value))
 * ```
 */
export function isZ<T>(schema: z.Schema<T>, input: unknown): input is T
/**
 * Return a function which determines if its input conforms to a Zod schema.
 */
export function isZ<T>(schema: z.Schema<T>): (input: unknown) => input is T
export function isZ<T>(schema: z.Schema<T>, ...args: unknown[]): unknown {
  if (args.length === 0) {
    return (curriedInput: unknown) => isZ(schema, curriedInput)
  }

  const [input] = args
  return schema.safeParse(input).success
}
