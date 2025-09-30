import styled from '@emotion/styled';
import { css } from '@emotion/react';
import theme from '../../../styles/theme';
import Typhography from '../../common/Typography';
import Textfield from '../../common/Textfield';
import Button from '../../common/Button';
import { useState } from 'react';
import useModal from '../../../hooks/useModal';
import { addFollower } from '../../../apis/childApi';
import { useNavigate } from 'react-router-dom';
import useDialog from '../../../hooks/useDialog';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border-radius: 1rem;
  width: 80vw;
  height: 50vh;
  max-width: 500px;
  max-height: 500px;
  background-color: ${theme.color.primary[50]};
`;

export const ModalButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
`;

export const StyledTextfield = styled(Textfield)`
  width: 10vw !important;
`;

export const InviteCodeModal = () => {
  const [code, setCode] = useState<string>('');
  const dialog = useDialog();
  const modal = useModal();
  const navigator = useNavigate();

  const submitInviteCode = () => {
    const request = {
      invitationCode: code,
    };
    addFollower(request)
      .then((response) => {
        modal.pop();
        modal.pop();
        window.location.href = 'main';
      })
      .catch((error) => {
        dialog.alert('msw환경에서는 지원하지 않습니다.');
      });
  };

  return (
    <Container>
      <Typhography size="2xl" weight="bold">
        초대코드 입력
      </Typhography>
      <StyledTextfield
        label="초대코드"
        size="md"
        inputValue={code}
        setInputValue={setCode}
      ></StyledTextfield>
      <ModalButtonContainer>
        <Button color="primary" onClick={submitInviteCode}>
          확인
        </Button>
        <Button
          color="danger"
          onClick={() => {
            modal.pop();
          }}
        >
          취소
        </Button>
      </ModalButtonContainer>
    </Container>
  );
};
