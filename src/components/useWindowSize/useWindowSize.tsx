import { useState, useEffect } from 'react';
type ScreenType = {
  width: null | number;
  height: null | number;
};
export function useWindowSize() {
  const [windowSize, setWindowSize] = useState<ScreenType>({
    width: null,
    height: null,
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return windowSize;
}
