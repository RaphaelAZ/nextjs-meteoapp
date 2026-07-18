"use client";

import { useCallback, useEffect, useRef, useState } from "react";

function readStorageValue<T>(key: string, initialValue: T): T {
  try {
    const item = window.localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : initialValue;
  } catch {
    return initialValue;
  }
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isHydrated, setIsHydrated] = useState(false);
  const initialValueRef = useRef(initialValue);

  useEffect(() => {
    queueMicrotask(() => {
      setStoredValue(readStorageValue(key, initialValueRef.current));
      setIsHydrated(true);
    });
  }, [key]);

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const nextValue = value instanceof Function ? value(prev) : value;
        try {
          window.localStorage.setItem(key, JSON.stringify(nextValue));
        } catch {
          // Ignore write errors
        }
        return nextValue;
      });
    },
    [key],
  );

  return { value: storedValue, setValue, isHydrated };
}
