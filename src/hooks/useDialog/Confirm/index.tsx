import { ReactNode } from 'react';

import * as s from './Confirm.style';

interface ConfirmProps {
  children: ReactNode;
  onClose: (confirm: boolean) => void;
}

const Confirm = ({ children, onClose }: ConfirmProps) => {
  return (
    <s.Confirm>
      <s.Message>{children}</s.Message>
      <s.ButtonContainer>
        <s.Button color="success" onClick={() => onClose(true)}>
          예
        </s.Button>
        <s.Button color="danger" onClick={() => onClose(false)}>
          아니오
        </s.Button>
      </s.ButtonContainer>
    </s.Confirm>
  );
};

export default Confirm;
