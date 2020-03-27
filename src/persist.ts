import { Middleware } from 'nedux';

const PREFIX = '@nedux-persist';

export const persistKeys = <T, K extends keyof T = keyof T>(
  keys: (keyof T)[],
  {
    storage = localStorage,
    version = '',
  }: { storage?: Storage; version?: string } = {},
): Middleware<T, K> => store => {
  const getter = async (key: K) =>
    JSON.parse(
      (await Promise.resolve(
        storage.getItem(`${PREFIX}-${version}:${key}`),
      )) as string,
    );

  const setter = (key: K, value: T[K]) =>
    Promise.resolve(
      storage.setItem(`${PREFIX}-${version}:${key}`, JSON.stringify(value)),
    );

  const persistKey = (key: K) => {
    let isHydrated = false;

    const next = async (value: T[K]) => {
      if (isHydrated) {
        setter(key, value);
      } else {
        isHydrated = true;
        const persistedValue = await getter(key);
        persistedValue !== undefined && persistedValue !== null && store.set(key, persistedValue);
      }
    };

    store.subscribe(key, next, { withInitialValue: true });
  };

  keys.forEach(key => persistKey(key as K));
};
