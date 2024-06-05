import { useState, useEffect, useRef } from 'react';

function useDebounce(value: string, delay: number = 500) {
  // State to store the debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  // Use useRef to store the timeout id
  const timeoutRef = useRef<any>(null);

  useEffect(() => {
    // Clear any existing timeout before setting a new one
    clearTimeout(timeoutRef.current);

    // Create a new timeout to update the debounced value
    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function to clear the timeout on unmount
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [value, delay]); // Only re-run if value or delay changes

  if (!value) return ""
  return debouncedValue.trim();
}

export default useDebounce;