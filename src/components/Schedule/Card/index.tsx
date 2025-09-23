import dayjs from 'dayjs';

import Typhography from '../../common/Typography';

import * as s from './style';

interface CardProps {
  title: string;
  description: string;
  start: string;
  end: string;
  onClick?: () => void;
}

const Card = ({ title, description, start, end, onClick }: CardProps) => {
  return (
    <s.Container onClick={onClick}>
      <Typhography color="white" size="lg">
        {title}
      </Typhography>
      <Typhography color="white" size="sm">
        {dayjs(start).format('HH:mm')} ~ {dayjs(end).format('HH:mm')}
      </Typhography>
      <Typhography color="white" size="sm">
        {description}
      </Typhography>
    </s.Container>
  );
};

export default Card;
