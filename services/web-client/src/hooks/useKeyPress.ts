import { useEffect } from "react";

export const useKeyPress = (handler: () => void) => {

  useEffect(() => {
    const downHandler = ({ key }: KeyboardEvent) => {
      if(key === 'Enter') {
        handler()
      }
    };

    window.addEventListener("keydown", downHandler);
    return () => {
      window.removeEventListener("keydown", downHandler);
    };
  }, []);
};