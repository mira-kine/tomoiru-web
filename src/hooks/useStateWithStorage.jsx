import { useEffect, useState } from 'react';

export function useStateWithStorage(initialValue, storageKey) {
  const [value, setValue] = useState(() => {
    //   get item in storage key
    const currentValue = localStorage.getItem(storageKey);
    // if no current value, set it to initial value
    return currentValue ? currentValue : initialValue;
  });
  useEffect(() => {
    if (value === null || value === undefined) {
      // remove item if null or undefined
      return localStorage.removeItem(storageKey);
    }
    //   otherwise set it with the key and value
    return localStorage.setItem(storageKey, value);
  }, [storageKey, value]);
  return [value, setValue];
}
