import React, { useEffect } from "react";

const useDynamicHeight = (
  element: React.MutableRefObject<any>,
  value: string
): void => {
  useEffect(() => {
    if (!element) return;

    if (value.length > 40) {
      element.current.style.height = "auto";
      element.current.style.height = element.current.scrollHeight + "px";
    } else {
      element.current.style.height = "20px";
    }
  }, [element, value]);
};

export default useDynamicHeight;
