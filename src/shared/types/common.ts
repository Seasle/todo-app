export type Brand<T, K> = T & { __tag: K };

export type Flavor<T, K> = T & { __tag?: K };
