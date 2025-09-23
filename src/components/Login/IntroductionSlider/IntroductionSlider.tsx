import { useEffect, useRef } from 'react';
import Int1 from '../../../assets/images/login/introduction1.png';
import Int2 from '../../../assets/images/login/introduction2.png';
import Int3 from '../../../assets/images/login/introduction3.png';
import Typhography from '../../common/Typography';
import * as s from './IntroductionSlider.style';

interface IntroductionSliderProps {
  level: number;
  handleLevel: (i: number) => void;
  loginMode: boolean;
}

export const IntroductionSlider = ({
  level,
  handleLevel,
  loginMode,
}: IntroductionSliderProps) => {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  // drag state refs for desktop click-and-drag
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const slides = [Int1, Int2, Int3];

  const descriptions = [
    '아이의 소중한 일상을 기록',
    '동화로 만나는 우리 아이',
    '복잡한 일정도 간편하게',
  ];

  const width = window.innerWidth;
  const height = window.innerHeight;

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleScroll = () => {
      const scrollPosition = slider.scrollLeft;
      const slideWidth = slider.offsetWidth;
      const newIndex = Math.round(scrollPosition / slideWidth);
      handleLevel(newIndex);
    };

    slider.addEventListener('scroll', handleScroll);

    // --- Drag to scroll (mouse) handlers ---
    const onMouseDown = (e: MouseEvent) => {
      isDownRef.current = true;
      // pageX includes page offset; use clientX relative to slider
      startXRef.current = e.pageX - slider.offsetLeft;
      scrollLeftRef.current = slider.scrollLeft;
      // prevent text/image selection
      (slider as HTMLElement).classList.add('is-dragging');
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDownRef.current) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = x - startXRef.current;
      slider.scrollLeft = scrollLeftRef.current - walk;
    };

    const stopDrag = () => {
      isDownRef.current = false;
      (slider as HTMLElement).classList.remove('is-dragging');
    };

    // touch handlers
    const onTouchStart = (e: TouchEvent) => {
      isDownRef.current = true;
      startXRef.current = e.touches[0].pageX - slider.offsetLeft;
      scrollLeftRef.current = slider.scrollLeft;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDownRef.current) return;
      const x = e.touches[0].pageX - slider.offsetLeft;
      const walk = x - startXRef.current;
      slider.scrollLeft = scrollLeftRef.current - walk;
    };

    slider.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', stopDrag);
    slider.addEventListener('mouseleave', stopDrag);

    slider.addEventListener('touchstart', onTouchStart, { passive: true });
    slider.addEventListener('touchmove', onTouchMove, { passive: true });
    slider.addEventListener('touchend', stopDrag);

    return () => {
      slider.removeEventListener('scroll', handleScroll);
      slider.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', stopDrag);
      slider.removeEventListener('mouseleave', stopDrag);
      slider.removeEventListener('touchstart', onTouchStart as EventListener);
      slider.removeEventListener('touchmove', onTouchMove as EventListener);
      slider.removeEventListener('touchend', stopDrag);
    };
  }, []);

  function handleScrollToRef(i: number) {
    const slide = slideRefs.current[i];
    if (slide) {
      slide.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }

  return (
    <s.Container>
      <s.InnerBox ref={sliderRef} loginMode={loginMode} height={height}>
        <s.SlideWrapper>
          {slides.map((slide, index) => (
            <s.MediaBox
              key={index}
              isActive={index === level}
              loginMode={loginMode}
              ref={(el) => (slideRefs.current[index] = el)}
            >
              <s.Gradient />
              <s.Img src={slide} alt={`Slide ${index + 1}`} draggable={false} />
            </s.MediaBox>
          ))}
        </s.SlideWrapper>
      </s.InnerBox>

      <s.TypographyContainer loginMode={loginMode}>
        <Typhography size="2xl" color="tertiary" shade="900" weight="bold">
          {descriptions[level]}
        </Typhography>
      </s.TypographyContainer>

      <s.LevelIndicatorWrapper loginMode={loginMode} width={width}>
        {slides.map((_, index) => (
          <s.LevelCircle
            key={index}
            isActive={index === level}
            onClick={() => handleScrollToRef(index)}
          />
        ))}
      </s.LevelIndicatorWrapper>
    </s.Container>
  );
};
