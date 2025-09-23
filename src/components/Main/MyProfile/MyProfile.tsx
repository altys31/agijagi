import styled from '@emotion/styled';
import LogoutIcon from '@heroicons/react/24/solid/ArrowRightStartOnRectangleIcon';
import EditIcon from '@heroicons/react/24/solid/PencilIcon';
import PhotoIcon from '@heroicons/react/24/solid/PhotoIcon';
import BoardIcon from '@heroicons/react/24/solid/ChatBubbleBottomCenterTextIcon';
import XIcon from '@heroicons/react/24/solid/XCircleIcon';
import { render } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import defaultImg from '../../../assets/images/adult.png';
import useModal from '../../../hooks/useModal';
import theme from '../../../styles/theme';
import { MemberResponse } from '../../../types/user';
import Typhography from '../../common/Typography';
import { EditMember } from '../EditMember/EditMember';
import { EditProfileImage } from '../EditProfileImage/EditProfileImage';
import { LogoutModal } from '../LogoutModal/LogoutModal';
import { DeleteMemberModal } from '../DeleteModal/DeleteModal';
import BoardPage from '../../../pages/BoardPage';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  background-color: ${theme.color.primary[200]};
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
  display: flex;
  justify-content: start;
  align-items: center;
`;

export const Photo = styled.img`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 50%;
  background-color: ${theme.color.greyScale[200]};
  border: 2px solid ${theme.color.greyScale[500]};
`;

export const MenuConatiner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 0.6rem;
  width: 85%;
  margin-top: 1rem;
`;

export const IconWrapper = styled.div`
  width: 24px;
  height: 24px;
`;
export const MenuItem = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.66rem;
`;

export interface MyProfileProps {
  member: MemberResponse | undefined;
  handleRender: () => void;
}
export const MyProfile = ({ member, handleRender }: MyProfileProps) => {
  const modal = useModal();
  const navigator = useNavigate();

  const handleEditMember = () => {
    if (member)
      modal.push({
        children: <EditMember member={member} handleRender={handleRender} />,
      });
  };

  const handleEditMemberImage = () => {
    if (member)
      modal.push({
        children: <EditProfileImage handleRender={handleRender} />,
      });
  };

  const handleLogout = () => {
    modal.push({
      children: <LogoutModal />,
    });
  };
  const handleDeleteModal = () => {
    modal.push({
      children: <DeleteMemberModal />,
    });
  };

  const handleBoard = () => {
    modal.push({
      children: <BoardPage />,
    });
  };

  return (
    <Container>
      <GridCard>
        <PhotoSection>
          <Photo
            src={member?.profileImageUrl ? member.profileImageUrl : defaultImg}
          />
        </PhotoSection>
        <ContentSection>
          <Typhography size="5xl" weight="bold">
            {member?.nickname}
          </Typhography>
        </ContentSection>
      </GridCard>
      <MenuConatiner>
        <MenuItem onClick={handleBoard}>
          <IconWrapper>
            <BoardIcon />
          </IconWrapper>
          <Typhography weight="bold">아기자기 게시판</Typhography>
        </MenuItem>
        <MenuItem onClick={handleEditMember}>
          <IconWrapper>
            <EditIcon />
          </IconWrapper>
          <Typhography weight="bold">회원정보 수정</Typhography>
        </MenuItem>
        <MenuItem onClick={handleEditMemberImage}>
          <IconWrapper>
            <PhotoIcon />
          </IconWrapper>
          <Typhography weight="bold">프로필 사진 수정</Typhography>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <IconWrapper>
            <LogoutIcon color={theme.color.danger[500]} />
          </IconWrapper>
          <Typhography color="danger" shade="500" weight="bold">
            로그아웃
          </Typhography>
        </MenuItem>
        <MenuItem onClick={handleDeleteModal}>
          <IconWrapper>
            <XIcon color={theme.color.danger[500]} />
          </IconWrapper>
          <Typhography color="danger" shade="500" weight="bold">
            회원 탈퇴
          </Typhography>
        </MenuItem>
      </MenuConatiner>
    </Container>
  );
};
