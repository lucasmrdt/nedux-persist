import { Middleware } from 'nedux';

const PREFIX = '@nedux-persist';

export const persistKeys = <T, K extends keyof T = keyof T>(
  keys: (keyof T)[],
  storage: Storage = localStorage,
): Middleware<T, K> => store => {
  const getter = async (key: K) =>
    JSON.parse(
      (await Promise.resolve(storage.getItem(`${PREFIX}:${key}`))) as string,
    );

  const setter = (key: K, value: T[K]) =>
    Promise.resolve(storage.setItem(`${PREFIX}:${key}`, JSON.stringify(value)));

  const persistKey = (key: K) => {
    let isHydrated = false;

    const next = async (value: T[K]) => {
      if (isHydrated) {
        setter(key, value);
      } else {
        isHydrated = true;
        store.set(key, await getter(key));
      }
    };

    store.subscribe(key, { next });
  };

  keys.forEach(key => persistKey(key as K));
};