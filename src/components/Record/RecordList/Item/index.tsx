import Typhography from '../../../common/Typography';

import * as s from './Item.style';

interface ItemProps {
  color: string;
  icon: string;
  title: string;
  description: string;
  date: string;
  onClick?: () => void;
}

const Item = ({
  color,
  icon,
  title,
  description,
  date,
  onClick,
}: ItemProps) => {
  return (
    <s.Item onClick={onClick}>
      <s.IconWrapper bacgkroundColor={color}>
        <s.Icon src={icon} alt="Icon" />
      </s.IconWrapper>
      <s.Text>
        <Typhography color="primary" weight="bold">
          {title}
        </Typhography>
        <Typhography color="greyScale" size="xs">
          {description}
        </Typhography>
      </s.Text>
      <Typhography color="greyScale" size="sm">
        {date}
      </Typhography>
    </s.Item>
  );
};

export default Item;
