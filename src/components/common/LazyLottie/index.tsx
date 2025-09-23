import { lazy, Suspense } from 'react';

import type { LottieComponentProps } from 'lottie-react';

const Lottie = lazy(() => import('lottie-react'));

const LazyLottie = ({ ref, ...props }: LottieComponentProps) => {
  return (
    <Suspense fallback={<>loading...</>}>
      <Lottie {...props} />
    </Suspense>
  );
};

export default LazyLottie;
