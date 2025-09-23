import { useRef } from 'react';

import * as s from './style';

import CommonImage from '../../../../common/Image';

import useIsInViewport from '../../../../../hooks/useIsInViewport';

interface ImageProps {
  src: string;
  alt: string;
}

const Image = ({ src, alt }: ImageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { isExposed } = useIsInViewport<HTMLDivElement>(containerRef);

  return (
    <s.Container ref={containerRef}>
      {isExposed && (
        <CommonImage src={src} alt={alt} width="100%" height="100%" />
      )}
    </s.Container>
  );
};
export default Image;
