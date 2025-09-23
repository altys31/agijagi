import { useState } from 'react';
import Skeleton from './Skeleton';

import * as s from './style';

interface ImageProps {
  src: string;
  alt: string;
  width: string;
  height: string;
}

const Image = ({ src, alt, width, height }: ImageProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <s.Container style={{ width, height }}>
      <s.Image src={src} alt={alt} onLoad={() => setIsLoading(false)} />
      <Skeleton done={!isLoading} />
    </s.Container>
  );
};

export default Image;
