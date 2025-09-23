import { useEffect, useState, useRef } from 'react';

const useIsInViewport = <T extends HTMLElement>(
  targetRef: React.RefObject<T>
) => {
  const [isInViewport, setIsInViewport] = useState<boolean>(false);
  const [isExposed, setIsExposed] = useState<boolean>(false);

  const observer = useRef<IntersectionObserver>();

  useEffect(() => {
    if (!observer.current) {
      const observerCallback = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          setIsInViewport(entry.isIntersecting);
          setIsExposed((isExposed) => isExposed || entry.isIntersecting);
        });
      };

      observer.current = new window.IntersectionObserver(observerCallback, {
        threshold: 0,
      });
    }

    if (targetRef.current) {
      observer.current.observe(targetRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [targetRef]);

  return { isInViewport, isExposed };
};

export default useIsInViewport;
