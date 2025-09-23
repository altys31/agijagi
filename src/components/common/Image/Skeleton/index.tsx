import * as s from './style';

interface SkeletonProps {
  done: boolean;
}

const Skeleton = ({ done }: SkeletonProps) => {
  return <s.Container done={done}></s.Container>;
};

export default Skeleton;
