import styled from '@emotion/styled';
import { css } from '@emotion/react';
import theme from '../../../styles/theme';
import Typhography from '../../common/Typography';
import Textfield from '../../common/Textfield';
import Button from '../../common/Button';
import { useState } from 'react';
import XIcon from '@heroicons/react/24/solid/XMarkIcon';
import useModal from '../../../hooks/useModal';
import { InviteCodeResponse } from '../../../types/child';
import useChildStore from '../../../stores/useChlidStore';
import { getInviteCode } from '../../../apis/childApi';
import { useQuery } from '@tanstack/react-query';

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

export const TextButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

export const InviteCodeContainer = styled.div`
  width: 60%;
  padding: 1rem;
  background-color: white;
  border-radius: 1rem;
`;

export const ExitIcon = styled.div`
  position: absolute;
  width: 24px;
  height: 24px;
  left: 87%;
  top: 10%;
`;

export const CopyIntroduction = styled.div<{ isCopied: boolean }>(
  (props) => css`
    transition: 0.5s all;
    opacity: ${props.isCopied ? 1 : 0};
    display: ${props.isCopied ? '' : 'none'};
  `
);

export const GetInviteCodeModal = () => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const modal = useModal();
  const { childId } = useChildStore();

  const { data: code } = useQuery<InviteCodeResponse>({
    queryKey: ['inviteCode', childId],
    queryFn: async () => {
      return await (
        await getInviteCode(childId)
      ).data;
    },
  });

  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
    } catch (e) {
      setIsCopied(false);
    }
  };

  return (
    <Container>
      <ExitIcon onClick={modal.pop}>
        <XIcon />
      </ExitIcon>
      <TitleWrapper>
        <Typhography size="2xl" weight="bold">
          초대코드
        </Typhography>
      </TitleWrapper>
      <TextButtonContainer>
        <InviteCodeContainer>
          <Typhography size="xs">{code?.invitationCode}</Typhography>
        </InviteCodeContainer>
        <Button
          size="sm"
          onClick={() => {
            handleCopyClipBoard(
              code?.invitationCode ? code.invitationCode : ''
            );
          }}
        >
          복사
        </Button>
      </TextButtonContainer>
      <CopyIntroduction isCopied={isCopied}>
        <Typhography size="sm" weight="bold">
          클립보드에 초대코드가 복사되었어요
        </Typhography>
      </CopyIntroduction>
    </Container>
  );
};
