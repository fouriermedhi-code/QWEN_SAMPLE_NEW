import { useEffect, useState } from "react";

/**
 * Tiny localStorage-backed state hook.
 * All Loma data lives in the browser — no backend needed.
 */
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage full or unavailable — fail silently */
    }
  }, [key, value]);

  return [value, setValue];
}
