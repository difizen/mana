import { useRef, useEffect } from 'react';

export function useLatest<T>(value: T) {
  const ref = useRef(value);
  ref.current = value;

  return ref;
}

export const useUnmount = (fn: () => void) => {
  const fnRef = useLatest(fn);

  useEffect(
    () => () => {
      fnRef.current();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
};

export const useMount = (fn: () => void) => {
  useEffect(() => {
    fn?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
