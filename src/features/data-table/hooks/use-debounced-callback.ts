import { useCallback, useEffect, useRef } from "react";

export function useDebouncedCallback<T extends (...args: never[]) => unknown>(
  callback: T,
  delay: number
) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  const debounceTimerRef = useRef(0);

  useEffect(() => () => window.clearTimeout(debounceTimerRef.current), []);

  return useCallback(
    (...args: Parameters<T>) => {
      window.clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = window.setTimeout(
        () => callbackRef.current(...args),
        delay
      );
    },
    [delay]
  );
}
