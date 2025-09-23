import * as s from './style';

interface SuspenseFallbackProps {
  width?: string;
  height: string;
  padding?: string;
}

const SuspenseFallback = ({
  width = '100%',
  height,
  padding = '0',
}: SuspenseFallbackProps) => {
  return (
    <s.Container style={{ width, height, padding }}>
      <s.Suspense></s.Suspense>
    </s.Container>
  );
};

export default SuspenseFallback;
