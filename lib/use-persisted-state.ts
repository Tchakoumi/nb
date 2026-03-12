"use client";

import { useState, useCallback, useRef } from "react";

const DEFAULT_VERSION = 1;

type Envelope<T> = {
  v: number;
  ts: number;
  data: T;
};

export function usePersistedState<T>(
  key: string,
  initialValue: T,
  options?: { version?: number }
): [T, (val: T | ((prev: T) => T)) => void, () => void] {
  const ver = options?.version ?? DEFAULT_VERSION;

  const readStorage = (): T => {
    if (typeof window === "undefined") return initialValue;
    try {
      const raw = sessionStorage.getItem(key);
      if (!raw) return initialValue;
      const envelope: Envelope<T> = JSON.parse(raw);
      if (envelope.v !== ver) {
        sessionStorage.removeItem(key);
        return initialValue;
      }
      return envelope.data;
    } catch {
      sessionStorage.removeItem(key);
      return initialValue;
    }
  };

  const [state, setState] = useState<T>(readStorage);
  const stateRef = useRef(state);
  stateRef.current = state;

  const setPersistedState = useCallback(
    (val: T | ((prev: T) => T)) => {
      setState((prev) => {
        const next = val instanceof Function ? val(prev) : val;
        try {
          const envelope: Envelope<T> = { v: ver, ts: Date.now(), data: next };
          sessionStorage.setItem(key, JSON.stringify(envelope));
        } catch {
          // quota exceeded — state still works in-memory
        }
        return next;
      });
    },
    [key, ver]
  );

  const clear = useCallback(() => {
    sessionStorage.removeItem(key);
    setState(initialValue);
  }, [key, initialValue]);

  return [state, setPersistedState, clear];
}
