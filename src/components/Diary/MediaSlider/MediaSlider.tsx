import { useEffect, useRef, useState } from 'react';
import Typhography from '../../common/Typography';
import MediaInput from '../MediaInput';
import {
  Container,
  DelIcon,
  DelIconDiv,
  IndexLabel,
  InnerBox,
  MediaBox,
  SlideWrapper,
} from './MediaSlider.styles';

interface MediaSliderProps {
  fileList?: File[];
  urlList: string[];
  urlType: string[];
  isWriteMode: boolean;
  handleUpload?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDelete?: (index: number) => void;
  handleUrlDelete?: (index: number) => void;
  removedList?: string[];
  isInitialRender: boolean;
}

export const MediaSlider = ({
  fileList = [],
  urlList = [],
  urlType = [],
  isWriteMode,
  handleUpload = () => {},
  handleDelete = () => {},
  handleUrlDelete = () => {},
  isInitialRender = true,
}: MediaSliderProps) => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  // drag state refs for click-and-drag behavior
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const [uploadKey, setUploadKey] = useState<number>(0);

  const handleWheel = (e: React.WheelEvent) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += e.deltaY;
    }
  };

  const handleScroll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (handleUpload) handleUpload(e);
    setUploadKey(uploadKey + 1);
  };

  useEffect(() => {
    if (
      scrollContainerRef.current &&
      (fileList.length > 0 || urlList.length > 0) &&
      isWriteMode
    ) {
      if (isInitialRender) {
        scrollContainerRef.current.scrollTo({
          left: 5000,
          behavior: 'smooth',
        });
      } else {
        scrollContainerRef.current.scrollTo({
          left:
            scrollContainerRef.current.scrollWidth -
            (window.innerWidth < 500 ? window.innerWidth * 2 : 1000),
          behavior: 'smooth',
        });
      }
    }
  }, [uploadKey, isWriteMode, isInitialRender]);

  // click-and-drag (mouse) and touch support
  useEffect(() => {
    const slider = scrollContainerRef.current;
    if (!slider) return;

    const onMouseDown = (e: MouseEvent) => {
      isDownRef.current = true;
      const rect = slider.getBoundingClientRect();
      startXRef.current = e.clientX - rect.left;
      scrollLeftRef.current = slider.scrollLeft;
      slider.classList.add('is-dragging');
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDownRef.current) return;
      e.preventDefault();
      const rect = slider.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const walk = x - startXRef.current;
      slider.scrollLeft = scrollLeftRef.current - walk;
    };

    const stopDrag = () => {
      isDownRef.current = false;
      slider.classList.remove('is-dragging');
    };

    const onTouchStart = (e: TouchEvent) => {
      isDownRef.current = true;
      const rect = slider.getBoundingClientRect();
      startXRef.current = e.touches[0].clientX - rect.left;
      scrollLeftRef.current = slider.scrollLeft;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDownRef.current) return;
      const rect = slider.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left;
      const walk = x - startXRef.current;
      slider.scrollLeft = scrollLeftRef.current - walk;
    };

    slider.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', stopDrag);
    slider.addEventListener('mouseleave', stopDrag);

    slider.addEventListener('touchstart', onTouchStart, {
      passive: true,
    } as AddEventListenerOptions);
    slider.addEventListener('touchmove', onTouchMove, {
      passive: true,
    } as AddEventListenerOptions);
    slider.addEventListener('touchend', stopDrag);

    return () => {
      slider.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', stopDrag);
      slider.removeEventListener('mouseleave', stopDrag);

      slider.removeEventListener('touchstart', onTouchStart as EventListener);
      slider.removeEventListener('touchmove', onTouchMove as EventListener);
      slider.removeEventListener('touchend', stopDrag);
    };
  }, []);

  const renderMedia = () => {
    return (
      <>
        {urlList.map((url, index) => (
          <MediaBox key={`url-${index}`}>
            <IndexLabel>
              <Typhography size="xs" color="white">
                {index + 1}/{urlList.length + fileList.length}
              </Typhography>
            </IndexLabel>
            {isWriteMode && (
              <DelIconDiv onClick={() => handleUrlDelete(index)}>
                {DelIcon}
              </DelIconDiv>
            )}
            {urlType[index] === 'image' ? (
              <img
                src={url}
                alt={`media-url-${index}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                draggable={false}
              />
            ) : (
              <video
                controls
                style={{ width: '100%', height: '100%' }}
                draggable={false}
              >
                <source src={url} />
              </video>
            )}
          </MediaBox>
        ))}

        {fileList.map((file, index) => (
          <MediaBox key={`file-${index}`}>
            <IndexLabel>
              <Typhography size="xs" color="white">
                {urlList.length + index + 1}/{urlList.length + fileList.length}
              </Typhography>
            </IndexLabel>
            {isWriteMode && (
              <DelIconDiv onClick={() => handleDelete(index)}>
                {DelIcon}
              </DelIconDiv>
            )}
            {file.type.startsWith('image/') ? (
              <img
                src={URL.createObjectURL(file)}
                alt={`media-${index}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                draggable={false}
              />
            ) : file.type.startsWith('video/') ? (
              <video
                controls
                style={{ width: '100%', height: '100%' }}
                draggable={false}
              >
                <source src={URL.createObjectURL(file)} />
              </video>
            ) : (
              <p>지원하지 않는 미디어 타입</p>
            )}
          </MediaBox>
        ))}

        {isWriteMode && (
          <MediaBox>
            <MediaInput handleUpload={handleScroll}></MediaInput>
          </MediaBox>
        )}
      </>
    );
  };

  return (
    <Container>
      <InnerBox ref={scrollContainerRef} onWheel={handleWheel}>
        <SlideWrapper>{renderMedia()}</SlideWrapper>
      </InnerBox>
    </Container>
  );
};

export default MediaSlider;
