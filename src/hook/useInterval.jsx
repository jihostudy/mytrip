import React, { useEffect, useRef } from "react";
//custom hook
export const useInterval = (callback, delay, isHovered) => {
  const savedCallback = useRef();
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null && !isHovered) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay, isHovered]);
};
