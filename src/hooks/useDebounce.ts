import { useState, useEffect } from 'react';
import { DEBOUNCE } from 'src/utils/constant';

type UseDebounceProps = {
  value: string;
  delay?: number;
};

function useDebounce({ value, delay = DEBOUNCE.time }: UseDebounceProps): string {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
