"use client";

import { useEffect, useState } from "react";

/**
 * Returns `value` after it has stopped changing for `delay` ms, so a search box
 * issues one request per pause rather than one per keystroke.
 */
export function useDebounced<T>(value: T, delay = 350): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
