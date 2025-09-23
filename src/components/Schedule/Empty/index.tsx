import * as s from './style';

import Lottie from 'lottie-react';

import RainyLottie from '../../../assets/lotties/rainy.json';

const Empty = () => {
  return (
    <s.Empty>
      <Lottie animationData={RainyLottie} style={{ height: '5rem' }} />
      등록된 일정이 없어요.
    </s.Empty>
  );
};

export default Empty;
