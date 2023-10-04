import { useState } from "react";

export const useLocalStorage = <T>(name: string) => {
  let storedValue = localStorage.getItem(name);
  let initialValue = storedValue ? JSON.parse(storedValue) : null;

  const [value, setValue] = useState<T | null>(initialValue);

  const addValue = (data: T) => {
    localStorage.setItem(name, JSON.stringify(data));
    setValue(data);
  };

  const removeValue = () => {
    localStorage.removeItem(name);
    setValue(null);
  };

  return { value, addValue, removeValue };
};
