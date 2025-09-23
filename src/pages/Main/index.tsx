import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllChildren, getUserInfo } from '../../apis/userApi';
import Typhography from '../../components/common/Typography';
import { MyFamily } from '../../components/Main/MyFamily/MyFamily';
import { MyProfile } from '../../components/Main/MyProfile/MyProfile';
import Alert from '../../hooks/useDialog/Alert';
import useMemberStore from '../../stores/useMemberStore';
import { BabyResponse, MemberResponse } from '../../types/user';
import { Container, TitleContainer } from './style';

export const Main = () => {
  const [renderKey, setRenderKey] = useState<number>(0);
  const { memberId } = useMemberStore();
  const navigator = useNavigate();

  const validMemberId = memberId;
  const {
    data: member,
    isLoading,
    error,
  } = useQuery<MemberResponse>({
    //    queryKey: ['member', validMemberId, renderKey],
    queryKey: ['member', memberId, renderKey],
    queryFn: () => {
      return getUserInfo(1);
    },
  });

  const { data: families = [] } = useQuery<BabyResponse[]>({
    queryKey: ['families'],
    queryFn: getAllChildren,
  });

  const handleRender = () => {
    setRenderKey(renderKey + 1);
  };

  if (isLoading)
    return (
      <Container>
        <Typhography size="3xl" color="primary" weight="bold">
          로딩중...
        </Typhography>
      </Container>
    );
  if (error)
    return (
      <Alert onClose={() => {}}>
        <Typhography size="3xl" color="primary" weight="bold">
          오류가 발생했어요
        </Typhography>
      </Alert>
    );

  return (
    <Container>
      <TitleContainer>
        <Typhography size="6xl" weight="bold">
          내 패밀리
        </Typhography>
      </TitleContainer>
      <MyFamily families={families} />

      <TitleContainer>
        <Typhography size="6xl" weight="bold">
          내 프로필
        </Typhography>
      </TitleContainer>
      <MyProfile member={member} handleRender={handleRender} />
    </Container>
  );
};
