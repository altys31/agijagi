import * as s from './style';

import Button from '../Button';
import Typhography from '../Typography';

import type { FallbackProps } from 'react-error-boundary';

import useInvalidateErrorCache from '../../../hooks/useInvalidateErrorCache';

interface ErrorBoundaryFallbackProps extends FallbackProps {
  children: string;
  width?: string;
  height: string;
  padding?: string;
}

const ErrorBoundaryFallback = ({
  children,
  width = '100%',
  height,
  padding = '0',
  resetErrorBoundary,
}: ErrorBoundaryFallbackProps) => {
  const { invalidate } = useInvalidateErrorCache();

  const handleResetClick = () => {
    invalidate();
    resetErrorBoundary();
  };

  return (
    <s.Wrapper style={{ width, height, padding }}>
      <s.Container>
        <Typhography>{children}</Typhography>
        <Button color="danger" size="sm" onClick={handleResetClick}>
          재시도
        </Button>
      </s.Container>
    </s.Wrapper>
  );
};

export default ErrorBoundaryFallback;
