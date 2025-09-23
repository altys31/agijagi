import styled from '@emotion/styled';
import defaultImg from '../../../assets/images/baby.png';
import theme from '../../../styles/theme';
import Typhography from '../../common/Typography';
import PlusIcon from '@heroicons/react/24/outline/PlusIcon';
import { useNavigate } from 'react-router-dom';
import useModal from '../../../hooks/useModal';
import { InviteOrAddModal } from '../InviteOrAddModal/InviteOrAddModal';

export const GridItem = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 100%;
  max-width: 500px;
  aspect-ratio: 1;
  border-radius: 1rem;
  border: 5px solid ${theme.color.greyScale[300]};
  opacity: 1;
`;

export const Photo = styled.img`
  width: 75%;
  height: 75%;
  object-fit: cover;
  opacity: 0.5;
`;

export const FamilyName = styled.div`
  text-align: center;
  align-self: center;
`;

export const BottomLine = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 20%;
  border-radius: 0rem 0rem calc(1rem - 5px) calc(1rem - 5px);
  background-color: ${theme.color.tertiary[200]};
  top: 80%;
  opacity: 0.85;
`;

export const IconWrapper = styled.div`
  position: absolute;
  width: 36px;
  height: 36px;
  color: white;
`;

export const AddFamily = () => {
  const navigator = useNavigate();
  const modal = useModal();

  const handleModal = () => {
    modal.push({
      children: <InviteOrAddModal />,
    });
  };
  return (
    <GridItem onClick={handleModal}>
      <Photo src={defaultImg} />
      <IconWrapper>
        <PlusIcon strokeWidth={2.5} />
      </IconWrapper>
      <BottomLine>
        <FamilyName>
          <Typhography size="2xs" weight="bold">
            초대코드 등록 / 패밀리 등록
          </Typhography>
        </FamilyName>
      </BottomLine>
    </GridItem>
  );
};
