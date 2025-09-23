import styled from '@emotion/styled';
import defaultBoy from '../../../assets/images/boy.png';
import defaultGirl from '../../../assets/images/girl.png';
import theme from '../../../styles/theme';
import Typhography from '../../common/Typography';
import UserIcon from '@heroicons/react/16/solid/UserIcon';
import ExitIcon from '@heroicons/react/24/solid/HomeIcon';
import { BabyResponse } from '../../../types/user';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import useModal from '../../../hooks/useModal';
import { FollowerModal } from '../FollowerModal/FollowerModal';
import useChildStore from '../../../stores/useChlidStore';
import { getAllFollowers } from '../../../apis/childApi';
import { FollowerResponse } from '../../../types/child';
import { useQuery } from '@tanstack/react-query';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;

export const GridCard = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  width: 90%;
  height: 100%;
  min-height: 120px;
  max-width: 500px;
  max-height: 180px;
  border-radius: 25px;
  background-color: ${theme.color.primary[50]};
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

export const PhotoSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-column: 1/2;
  padding-left: 1rem;
`;

export const ContentSection = styled.div`
  grid-column: 2/3;
  padding-left: 1rem;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
`;

export const Photo = styled.img`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 50%;
  background-color: ${theme.color.greyScale[200]};
  border: 2px solid ${theme.color.greyScale[500]};
`;

export const MemberInfo = styled.div`
  display: flex;
  position: absolute;
  align-items: center;
  padding: 0.25rem;
  border: 2px solid ${theme.color.primary[900]};
  background-color: ${theme.color.primary[50]};
  border-radius: 0.5rem;
  top: 50%;
  left: 72%;
`;
export const ExitIconWrapper = styled.div`
  display: flex;
  position: absolute;
  align-items: center;
  width: 24px;
  height: 24px;
  padding: 0.25rem;
  background-color: ${theme.color.primary[50]};
  border-radius: 0.5rem;
  top: 12%;
  left: 74%;
`;

export const IconWrapper = styled.div`
  width: 24px;
  height: 24px;
`;

export const DayCountWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.25rem;
`;
export interface BabyProfileCardProps {
  child?: BabyResponse;
  followers?: FollowerResponse[];
}

export const BabyProfileCard = ({
  child,
  followers = [],
}: BabyProfileCardProps) => {
  const modal = useModal();
  const navigator = useNavigate();
  const today = moment();
  const differenceIndays = today.diff(
    moment(child?.birthday, 'YYYY-MM-DD'),
    'days'
  );

  const { childId } = useChildStore();

  const handleFollowerModal = () => {
    modal.push({
      children: <FollowerModal followers={followers} />,
      animation: 'bottom',
    });
  };

  return (
    <Container>
      <GridCard>
        <PhotoSection
          onClick={() => {
            navigator('/family/profile');
          }}
        >
          <Photo
            src={
              child?.imageUrl
                ? child.imageUrl
                : child?.gender === '남아'
                ? defaultBoy
                : defaultGirl
            }
          />
        </PhotoSection>
        <ContentSection>
          <Typhography size="xs" color="primary" weight="bold">
            {child?.name}
          </Typhography>
          <Typhography size="3xl" weight="bold">
            {child?.nickname}
          </Typhography>
          <DayCountWrapper>
            <Typhography size="sm">태어난지</Typhography>
            <Typhography size="sm" color="primary" shade="900" weight="bold">
              {differenceIndays ? differenceIndays : 0}
            </Typhography>
            <Typhography size="sm">일</Typhography>
          </DayCountWrapper>

          <MemberInfo onClick={handleFollowerModal}>
            <Typhography size="xl" color="primary" weight="extraBold">
              {child?.followerNum}
            </Typhography>
            <IconWrapper>
              <UserIcon color={theme.color.primary[900]} />
            </IconWrapper>
          </MemberInfo>
          <ExitIconWrapper onClick={() => navigator('/main')}>
            <ExitIcon color={theme.color.primary[900]} />
          </ExitIconWrapper>
        </ContentSection>
      </GridCard>
    </Container>
  );
};
