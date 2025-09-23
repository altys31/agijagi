import DiaryTyphography from '../../common/DiaryTyphography';
import { TextBackground, TextBox } from './DiaryContent.styles';

interface DiaryContentProps {
  DiaryText: string;
}

export const DiaryContent = ({ DiaryText }: DiaryContentProps) => {
  return (
    <TextBackground>
      <TextBox>
        <DiaryTyphography size="xl">{DiaryText}</DiaryTyphography>
      </TextBox>
    </TextBackground>
  );
};
