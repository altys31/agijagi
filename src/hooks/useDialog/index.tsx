import { ReactNode } from 'react';

import useModal from '../useModal';

import Alert from './Alert';
import Confirm from './Confirm';

const useDialog = () => {
  const modal = useModal();

  const alert = (message: ReactNode) => {
    return new Promise((resolve) => {
      modal.push({
        children: <Alert onClose={() => modal.pop()}>{message}</Alert>,
        animation: 'alert',
        onClose: () => {
          resolve(true);
        },
      });
    });
  };

  const confirm = (message: ReactNode): Promise<boolean> => {
    return new Promise((resolve) => {
      let result = false;
      modal.push({
        children: (
          <Confirm
            onClose={(confirm) => {
              result = confirm;
              modal.pop();
            }}
          >
            {message}
          </Confirm>
        ),
        animation: 'alert',
        onClose: () => {
          resolve(result);
        },
      });
    });
  };

  return { alert, confirm };
};

export default useDialog;
