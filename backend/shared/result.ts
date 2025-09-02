export type Result<T> = Ok<T> | Err<T>;

export type Ok<T> = { val: T; is_error: false };
export type Err<T> = { val: null; is_error: true; error: string };

export function Error<T>(message: string): Err<T> {
  return { val: null, is_error: true, error: message };
}

export function Ok<T>(value: T): Ok<T> {
  return { val: value, is_error: false };
}
