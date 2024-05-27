import { useEffect, useState } from "react";

const useDevice = () => {
  const [isDesktop, setIsDesktop] = useState(true);
  const [isMobile, setIsMobile] = useState(true);
  const [isTablet, setIsTablet] = useState(true);

  useEffect(() => {
    const updateState = function () {
      const initIsDesktop = window?.innerWidth >= 1024;
      const initIsMobile = window?.innerWidth < 1024;
      const initIsTablet = window?.innerWidth >= 768;

      setIsDesktop(initIsDesktop);
      setIsMobile(initIsMobile);
      setIsTablet(initIsTablet);
    };
    updateState();
    window.addEventListener("resize", updateState);
    return () => window.removeEventListener("resize", updateState);
  }, []);
  return { isDesktop, isMobile, isTablet };
};

export default useDevice;
