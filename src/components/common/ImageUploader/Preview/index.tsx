import * as s from './style';

import useDialog from '../../../../hooks/useDialog';

interface PreviewProps {
  src: string;
  onRemove: () => void;
}

const Preview = ({ src, onRemove }: PreviewProps) => {
  const { confirm } = useDialog();

  const handleClick = async () => {
    if (await confirm('선택한 이미지를 삭제할까요?')) {
      onRemove();
    }
  };

  return (
    <s.Container onClick={handleClick}>
      <s.Image src={src} alt="미리보기" />
    </s.Container>
  );
};

export default Preview;
