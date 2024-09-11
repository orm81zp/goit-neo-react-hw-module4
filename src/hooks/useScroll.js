import { useEffect, useState } from "react";

const useScroll = (refContainer) => {
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    return () => clearTimeout(timeoutId);
  }, [timeoutId]);

  const scrollTo = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const id = setTimeout(() => {
      if (refContainer.current) {
        const { height } = refContainer.current.getBoundingClientRect();
        window.scroll({
          top: height,
          left: 0,
          behavior: "smooth",
        });
      }
    }, 0);

    setTimeoutId(id);
  };

  return { scrollTo };
};

export default useScroll;
