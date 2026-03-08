/** Shared type for passing an AbortSignal to API calls. */
export interface RequestOptions {
  signal?: AbortSignal;
}

/** Utility type that adds an optional signal to mutation input payloads. */
export type MutationWithSignal<T> = T & { signal?: AbortSignal };
