import styled from '@emotion/styled';
import { css } from '@emotion/react';
import theme from '../../../styles/theme';
import Button from '../../common/Button';
import Typhography from '../../common/Typography';
import useModal from '../../../hooks/useModal';
import { InviteCodeModal } from '../../Signup/InviteCodeModal/InviteCodeModal';
import { useNavigate } from 'react-router-dom';

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 75vw;
  height: auto;
  gap: 2rem;
  background-color: ${theme.color.primary[50]};
  padding: 1.5rem;
  border-radius: 0.5rem;
`;
export const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const InviteOrAddModal = () => {
  const navigator = useNavigate();
  const modal = useModal();

  const handleNavigate = () => {
    navigator('/familyform');
    navigator('/familyform');
    modal.pop();
  };
  const handleInviteCodeModal = () => {
    modal.push({
      children: <InviteCodeModal />,
    });
  };

  return (
    <Container>
      <TitleWrapper>
        <Typhography size="3xl" weight="bold">
          패밀리 추가
        </Typhography>
      </TitleWrapper>
      <Button
        fullWidth={true}
        color="secondary"
        onClick={handleInviteCodeModal}
      >
        초대코드 등록
      </Button>
      <Button fullWidth={true} onClick={handleNavigate}>
        패밀리 등록
      </Button>
      <Button color="danger" onClick={modal.pop}>
        취소
      </Button>
    </Container>
  );
};
