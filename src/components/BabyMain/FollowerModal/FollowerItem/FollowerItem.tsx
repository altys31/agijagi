import styled from '@emotion/styled';
import theme from '../../../../styles/theme';
import {
  DeleteFollowerRequest,
  FollowerResponse,
} from '../../../../types/child';
import Typhography from '../../../common/Typography';
import defaultImg from '../../../../assets/images/adult.png';
import Button from '../../../common/Button';
import { useEffect, useRef, useState } from 'react';
import SuspenseFallback from '../../../common/SuspenseFallback';
// css import removed (unused)
import { Authority, BabyResponse } from '../../../../types/user';
import { useQuery } from '@tanstack/react-query';
import useChildStore from '../../../../stores/useChlidStore';
import {
  deleteFollower,
  editFollower,
  getChild,
} from '../../../../apis/childApi';
import useMemberStore from '../../../../stores/useMemberStore';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const ProfileContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  width: 90%;
  text-align: center;
`;

export const ProfileImg = styled.img`
  width: 36px;
  height: 36px;
  border: 2px solid ${theme.color.primary[900]};
  border-radius: 50%;
`;

export const ButtonContainer = styled.div`
  width: auto;
`;

export const Popup = styled.div<{ isVisible: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 100%;
  overflow: hidden;
  height: ${({ isVisible }) =>
    isVisible ? '7rem' : '1rem'}; /* Popup height */
  transition: height 0.33s ease-in-out, opacity 0.33s ease-in-out;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  border-radius: 0.5rem;
  pointer-events: ${({ isVisible }) => (isVisible ? 'auto' : 'none')};
`;

export const PopupItem = styled.label`
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  padding: 0.2rem;
  border-radius: 0.3rem;
  :hover {
    background-color: ${theme.color.greyScale[500]};
  }
`;

export const Skeleton = styled.div`
  width: 36px;
  height: 36px;
  position: absolute;
  border-radius: 50%;
  border: 2px solid ${theme.color.primary[900]};
`;

export const MenuConatiner = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

export interface FollowerItemProps {
  member: FollowerResponse;
  render: () => void;
}

export const FollowerItem = ({ member, render }: FollowerItemProps) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [imgLoading, setImgLoading] = useState<boolean>(true);

  const { memberId } = useMemberStore();
  const { childId } = useChildStore();

  const handlePopup = () => {
    setIsClicked(!isClicked);
  };
  const handleEditFollower = () => {
    const request = {
      childId: childId,
      followerId: member.followerId,
      authority:
        member.authority === 'READ'
          ? ('WRITE' as Authority)
          : ('READ' as Authority),
    };

    editFollower(request)
      .then(() => {
        render();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteFollower = () => {
    const request = {
      childId: childId,
      followerId: member.followerId,
    };

    deleteFollower(request)
      .then(() => {
        render();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const { data: child } = useQuery<BabyResponse>({
    queryKey: ['child', childId],
    queryFn: () => {
      if (childId === 0)
        return Promise.reject(new Error('유효하지 않은 childId입니다.'));
      return getChild(childId);
    },
  });

  // reset image loading when image url changes
  useEffect(() => {
    setImgLoading(true);
  }, [member.imageUrl]);

  return (
    <Container>
      <ProfileContainer>
        {/* skeleton while profile image loads */}
        {imgLoading && (
          <Skeleton>
            <SuspenseFallback width="36px" height="36px" />
          </Skeleton>
        )}
        <ProfileImg
          src={member.imageUrl ? member.imageUrl : defaultImg}
          onLoad={() => setImgLoading(false)}
          onError={() => setImgLoading(false)}
          style={{ visibility: imgLoading ? 'hidden' : 'visible' }}
        />
        <Typhography size="xl" weight="bold">
          {member.nickname}
        </Typhography>
        <ButtonContainer>
          <Button
            size="sm"
            disabled={
              child?.authority === 'READ' || member.followerId === memberId
            }
            onClick={handlePopup}
          >
            관리
          </Button>
        </ButtonContainer>
      </ProfileContainer>
      <Popup isVisible={isClicked}>
        <MenuConatiner>
          <Typhography weight="bold">관리 권한</Typhography>
          <Button size="sm" color="secondary" onClick={handleEditFollower}>
            {member.authority === 'WRITE' ? '쓰기' : '읽기'}
          </Button>
        </MenuConatiner>
        <MenuConatiner>
          <Typhography weight="bold">멤버 추방</Typhography>
          <Button size="sm" color="danger" onClick={handleDeleteFollower}>
            추방
          </Button>
        </MenuConatiner>
      </Popup>
    </Container>
  );
};
