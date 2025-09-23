import { useEffect, useState } from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import { getMyInfo } from '../../apis/userApi';

import useChildStore from '../../stores/useChlidStore';
import useMemberStore from '../../stores/useMemberStore';

type Authority = 'GUEST_ONLY' | 'MEMBER_ONLY' | 'CHILD_SELECTED_MEMBER_ONLY';

interface AuthenticationProps {
  authority: Authority;
}

const Authentication = ({ authority }: AuthenticationProps) => {
  const { memberId, updateMemberId } = useMemberStore();
  const { childId } = useChildStore();

  const [block, setBlock] = useState<boolean>(true);

  useEffect(() => {
    const update = async () => {
      try {
        const result = await getMyInfo();

        updateMemberId(result.data.memberId);
      } catch (error) {
      } finally {
        setBlock(false);
      }
    };

    update();
  }, []);

  if (block) {
    return <></>;
  }

  switch (authority) {
    case 'GUEST_ONLY':
      if (memberId) {
        return <Navigate to="/main" />;
      }
      break;
    case 'MEMBER_ONLY':
      if (!memberId) {
        return <Navigate to="/login" />;
      }
      break;
    case 'CHILD_SELECTED_MEMBER_ONLY':
      /* msw 사용으로 주석처리
      if (!memberId) {
        return <Navigate to="/login" />;
      }*/

      if (!childId) {
        return <Navigate to="/main" />;
      }
      break;
    default:
  }

  return <Outlet />;
};

export default Authentication;
