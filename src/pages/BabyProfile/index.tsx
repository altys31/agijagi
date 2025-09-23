import styled from '@emotion/styled';
import CalendarIcon from '@heroicons/react/24/solid/CalendarIcon';
import ReportIcon from '@heroicons/react/24/solid/NewspaperIcon';
import PencilIcon from '@heroicons/react/24/solid/PencilIcon';
import PhotoIcon from '@heroicons/react/24/solid/PhotoIcon';
import InviteCodeIcon from '@heroicons/react/24/solid/UserPlusIcon';
import DeleteIcon from '@heroicons/react/24/solid/XCircleIcon';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getChild } from '../../apis/childApi';
import { BabyProfileCard } from '../../components/BabyMain/BabyProfileCard/BabyProfileCard';
import { BabyReportCard } from '../../components/BabyMain/BabyReportCard/BabyReportCard';
import { DeleteBaby } from '../../components/BabyMain/DeleteBaby/DeleteBaby';
import { EditBabyImage } from '../../components/BabyMain/EditBabyImage/EditBabyImage';
import { EditBabyInfo } from '../../components/BabyMain/EditBabyInfo/EditBabyInfo';
import { GetInviteCodeModal } from '../../components/BabyMain/InviteCodeModal/InviteCodeModal';
import Typhography from '../../components/common/Typography';
import useModal from '../../hooks/useModal';
import useChildStore from '../../stores/useChlidStore';
import theme from '../../styles/theme';
import { BabyResponse } from '../../types/user';
import SchedulePage from '../SchedulePage';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
export const TitleContainer = styled.div`
  display: flex;
  justify-content: start;
  width: 100%;
  margin: 1rem;
  margin-left: 3rem;
`;

export const MenuConatiner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 1.25rem;
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

export const BabyProfile = () => {
  const { childId } = useChildStore();

  const { data: child } = useQuery<BabyResponse>({
    queryKey: ['child', childId],
    queryFn: () => {
      if (childId === 0)
        return Promise.reject(new Error('유효하지 않은 childId입니다.'));
      return getChild(childId);
    },
  });

  const modal = useModal();
  const navigator = useNavigate();
  const handleEditBabyInfo = () => {
    modal.push({
      children: <EditBabyInfo child={child} />,
    });
  };

  const handleInviteCode = () => {
    modal.push({
      children: <GetInviteCodeModal />,
    });
  };
  const handleEditFamilyImage = () => {
    modal.push({
      children: <EditBabyImage />,
    });
  };

  const handelDeleteFamily = () => {
    modal.push({
      children: <DeleteBaby />,
    });
  };

  const handleSchedule = () => {
    modal.push({
      children: <SchedulePage />,
    });
  };

  return (
    <Container>
      <TitleContainer>
        <Typhography size="5xl" weight="bold">
          패밀리 프로필
        </Typhography>
      </TitleContainer>
      <BabyProfileCard child={child}></BabyProfileCard>
      <BabyReportCard />
      <MenuConatiner>
        <MenuItem onClick={() => navigator('/report')}>
          <IconWrapper>
            <ReportIcon />
          </IconWrapper>
          <Typhography weight="bold">성장 분석 보고서 조회</Typhography>
        </MenuItem>
        <MenuItem onClick={handleSchedule}>
          <IconWrapper>
            <CalendarIcon />
          </IconWrapper>
          <Typhography weight="bold">아기 일정 조회</Typhography>
        </MenuItem>
        <MenuItem
          onClick={child?.authority === 'WRITE' ? handleEditBabyInfo : () => {}}
        >
          <IconWrapper>
            <PencilIcon />
          </IconWrapper>
          <Typhography
            color={child?.authority === 'WRITE' ? 'black' : 'greyScale'}
            shade={child?.authority === 'WRITE' ? '900' : '500'}
            weight="bold"
          >
            아기 정보 수정하기
          </Typhography>
        </MenuItem>
        <MenuItem
          onClick={
            child?.authority === 'WRITE' ? handleEditFamilyImage : () => {}
          }
        >
          <IconWrapper>
            <PhotoIcon />
          </IconWrapper>
          <Typhography
            color={child?.authority === 'WRITE' ? 'black' : 'greyScale'}
            shade={child?.authority === 'WRITE' ? '900' : '500'}
            weight="bold"
          >
            패밀리 이미지 수정하기
          </Typhography>
        </MenuItem>
        <MenuItem
          onClick={child?.authority === 'WRITE' ? handleInviteCode : () => {}}
        >
          <IconWrapper>
            <InviteCodeIcon />
          </IconWrapper>
          <Typhography
            color={child?.authority === 'WRITE' ? 'black' : 'greyScale'}
            shade={child?.authority === 'WRITE' ? '900' : '500'}
            weight="bold"
          >
            초대코드 생성하기
          </Typhography>
        </MenuItem>
        <MenuItem
          onClick={child?.authority === 'WRITE' ? handelDeleteFamily : () => {}}
        >
          <IconWrapper>
            <DeleteIcon color={theme.color.danger[500]} />
          </IconWrapper>
          <Typhography
            color={child?.authority === 'WRITE' ? 'danger' : 'greyScale'}
            shade={child?.authority === 'WRITE' ? '500' : '500'}
            weight="bold"
          >
            패밀리 삭제하기
          </Typhography>
        </MenuItem>
      </MenuConatiner>
    </Container>
  );
};

export default BabyProfile;
