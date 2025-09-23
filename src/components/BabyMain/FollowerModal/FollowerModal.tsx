import styled from '@emotion/styled';
import XIcon from '@heroicons/react/24/solid/XMarkIcon';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getAllFollowers } from '../../../apis/childApi';
import useModal from '../../../hooks/useModal';
import useChildStore from '../../../stores/useChlidStore';
import theme from '../../../styles/theme';
import { FollowerResponse } from '../../../types/child';
import Typhography from '../../common/Typography';
import { FollowerItem } from './FollowerItem/FollowerItem';

export const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 60vh;
  background-color: ${theme.color.primary[50]};
  border-radius: 2rem 2rem 0rem 0rem;
  overflow-x: hidden;
`;

export const ExitIcon = styled.div`
  position: absolute;
  width: 24px;
  height: 24px;
  left: 87%;
  top: 3%;
`;

export const FollowersContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: translateY(3rem);
`;

export const TitleContainer = styled.div`
  margin-bottom: 1.5rem;
`;

export const FollowerModal = ({
  followers,
}: {
  followers: FollowerResponse[];
}) => {
  const modal = useModal();
  const { childId } = useChildStore();
  const [renderKey, setRenderKey] = useState<number>(0);

  const handleRenderKey = () => {
    setRenderKey(renderKey + 1);
  };

  return (
    <Container>
      <ExitIcon onClick={modal.pop}>
        <XIcon />
      </ExitIcon>
      <FollowersContainer>
        <TitleContainer>
          <Typhography size="2xl" weight="bold">
            패밀리 멤버 조회
          </Typhography>
        </TitleContainer>
        {followers.map((item, index) => (
          <FollowerItem key={index} member={item} render={handleRenderKey} />
        ))}
      </FollowersContainer>
    </Container>
  );
};
