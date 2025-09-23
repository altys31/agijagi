import { ReactNode } from 'react';

import * as s from './Alert.style';

interface AlertProps {
  children: ReactNode;
  onClose: () => void;
}

const Alert = ({ children, onClose }: AlertProps) => {
  return (
    <s.Alert>
      <s.Message>{children}</s.Message>
      <s.ButtonContainer>
        <s.Button onClick={() => onClose()}>확인</s.Button>
      </s.ButtonContainer>
    </s.Alert>
  );
};

export default Alert;
