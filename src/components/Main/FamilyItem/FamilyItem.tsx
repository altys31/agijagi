import { css } from '@emotion/react';
import styled from '@emotion/styled';
import theme from '../../../styles/theme';
import defaultBoy from '../../../assets/images/boy.png';
import defaultGirl from '../../../assets/images/girl.png';
import defaultNone from '../../../assets/images/adult.png';
import Typhography from '../../common/Typography';
import UserIcon from '@heroicons/react/16/solid/UserIcon';
import { BabyGender, BabyResponse } from '../../../types/user';
import { useNavigate } from 'react-router-dom';
import useChildStore from '../../../stores/useChlidStore';

export const GridItem = styled.div<{ isParent: boolean }>(
  (props) =>
    css`
      position: relative;
      width: 80%;
      height: 100%;
      max-width: 500px;
      aspect-ratio: 1;
      border-radius: 1rem;
      border: 5px solid
        ${props.isParent
          ? theme.color.primary[300]
          : theme.color.secondary[300]};
      overflow: hidden;
    `
);

export const Photo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
export const FamilyName = styled.div`
  text-align: center;
  align-self: center;
`;

export const MemberInfo = styled.div`
  display: flex;
  position: absolute;
  align-items: center;
  padding: 0.125rem;
  border: 2px solid ${theme.color.primary[900]};
  background-color: ${theme.color.primary[50]};
  border-radius: 0.5rem;
  top: 4%;
  left: 72.5%;
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
`;

export const IconWrapper = styled.div`
  width: 18px;
  height: 18px;
`;

export interface FamilyItem {
  babyInfo: BabyResponse;
}
function getDefaultImg(gender: BabyGender) {
  switch (gender) {
    case '남아':
      return defaultBoy;
    case '여아':
      return defaultGirl;
    case '모름':
      return defaultNone;
  }
}
export const FamilyItem = ({ babyInfo }: FamilyItem) => {
  const navigator = useNavigate();

  const { childId, updateChildId } = useChildStore();

  return (
    <GridItem
      isParent={babyInfo.authority === 'WRITE'}
      onClick={() => {
        updateChildId(babyInfo.childId);
        navigator('/family');
      }}
    >
      <Photo
        src={
          babyInfo.imageUrl ? babyInfo.imageUrl : getDefaultImg(babyInfo.gender)
        }
      />
      <MemberInfo>
        <Typhography size="xs" color="primary" weight="extraBold">
          {babyInfo.followerNum}
        </Typhography>
        <IconWrapper>
          <UserIcon color={theme.color.primary[900]} />
        </IconWrapper>
      </MemberInfo>
      <BottomLine>
        <FamilyName>
          <Typhography size="sm" weight="bold">
            {babyInfo.nickname}
          </Typhography>
        </FamilyName>
      </BottomLine>
    </GridItem>
  );
};
