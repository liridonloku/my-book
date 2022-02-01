import React, { useEffect } from "react";

const useDynamicHeight = (
  element: React.MutableRefObject<any>,
  value: string
): void => {
  useEffect(() => {
    if (!element) return;

    element.current.style.height = "auto";
    element.current.style.height = element.current.scrollHeight + "px";
  }, [element, value]);
};

export default useDynamicHeight;
