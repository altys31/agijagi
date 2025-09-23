import { useEffect, useState } from 'react';

const useSwipe = <T extends HTMLElement>(ref: React.RefObject<T>) => {
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    const current = ref.current;

    if (current === null) {
      return;
    }

    current.style.transform = `translateX(-100%)`;

    const width = current.getBoundingClientRect().width;

    let startX = 0,
      endX = 0,
      down = false;

    const handleTouchStart = (e: TouchEvent) => {
      if (!current) {
        return;
      }

      down = true;
      startX = e.touches[0].clientX;
      endX = 0;
      current.style.transition = '';
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!down || !current) {
        return;
      }

      endX = Math.min(Math.max(-width, e.touches[0].clientX - startX), width);

      current.style.transform = `translateX(calc(-100% + ${endX}px))`;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!current) {
        return;
      }

      down = false;

      current.style.transition = '';

      if (endX * -1.8 >= width) {
        setIndex((index) => index + 1);
        current.style.transform = `translateX(${endX}px)`;
      }

      if (endX * 1.8 >= width) {
        setIndex((index) => index - 1);
        current.style.transform = `translateX(calc(-200% + ${endX}px))`;
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      current.clientWidth;

      current.style.transition = 'transform 0.2s ease';
      current.style.transform = `translateX(-100%)`;
    };

    current.addEventListener('touchstart', handleTouchStart);
    current.addEventListener('touchmove', handleTouchMove);
    current.addEventListener('touchend', handleTouchEnd);

    return () => {
      if (!current) {
        return;
      }

      current.removeEventListener('touchstart', handleTouchStart);
      current.removeEventListener('touchmove', handleTouchMove);
      current.removeEventListener('touchend', handleTouchEnd);
    };
  }, [ref]);

  return { index };
};

export default useSwipe;
