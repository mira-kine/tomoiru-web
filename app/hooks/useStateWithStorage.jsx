import { useEffect, useState } from "react";

export function useStateWithStorage(storageKey, initialValue) {
  const [value, setValue] = useState(
    localStorage.getItem(storageKey) || initialValue,
    //   get item in storage key
    // if no current value, set it to initial value
  );
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
