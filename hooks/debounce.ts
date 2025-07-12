import { useCallback, useEffect, useRef, useState } from "react";
type TDebounceCb = (cb: any, delayMs: number) => void;
interface IDebounce {
  debounce: TDebounceCb;
  debouncing: boolean;
}
export function useDebounce(): IDebounce {
  const delay = useRef<number | null>(null);
  const [debouncing, setDebouncing] = useState(false);
  useEffect(() => () => clearTimeout(delay.current!), []);
  const debounce = useCallback<TDebounceCb>(
    (cb: () => any, delayMs: number) => {
      setDebouncing(true);
      window.clearTimeout(delay.current!);
      if (cb) {
        delay.current = window.setTimeout(() => {
          cb();
          setDebouncing(false);
        }, delayMs);
      }
    },
    []
  );
  return {
    debounce,
    debouncing,
  };
}
