import { useState, useEffect } from "react";

type useLocalStorageNumberReturnValue = [number, (value: number) => void];

const useLocalStorageNumber = (
  key: string,
  defaultValue: number
): useLocalStorageNumberReturnValue => {
  const [state, setState] = useState(
    () => Number(window.localStorage.getItem(key)) || defaultValue
  );

  useEffect(() => {
    window.localStorage.setItem(key, state.toString());
  }, [key, state]);

  return [state, setState];
};

export default useLocalStorageNumber;
