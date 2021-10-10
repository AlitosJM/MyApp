import React, { useEffect, useRef } from "react";

export const ContextualComponent = ({ html }) => {
  const ref = useRef(null);

  useEffect(() => {
    const { current } = ref;

    const documentFragment = document
      .createRange()
      .createContextualFragment(html);

    current.appendChild(documentFragment);

    return () => {
      current.textContent = "";
    };
  }, [html]);

  return <div ref={ref} />;
};