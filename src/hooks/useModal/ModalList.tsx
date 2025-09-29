import { forwardRef, useImperativeHandle, useRef, useState } from 'react';

import { ModalData, ModalPushProps } from '.';

import Modal from './Modal';

export interface ModalListRef {
  pop: () => void;
  push: ({ children, animation, onClose }: ModalPushProps) => void;
}

const ModalList = forwardRef<ModalListRef>((_, ref) => {
  const [modals, setModals] = useState<ModalData[]>([]);

  const countRef = useRef<number>(0);

  useImperativeHandle(
    ref,
    () => {
      return {
        pop() {
          for (let i = modals.length - 1; i >= 0; i--) {
            if (modals[i].state === 'FADEOUT') {
              continue;
            }

            // capture the id to avoid referencing the changing loop variable later
            const removeId = modals[i].id;

            modals[i].state = 'FADEOUT';
            modals[i].onFadeOutEnd = () => {
              setModals((currentModals) => {
                const toCall: (() => void)[] = [];
                const filtered = currentModals.filter((m) => {
                  if (m.id === removeId) {
                    if (m.onClose) toCall.push(m.onClose);
                    return false;
                  }
                  return true;
                });

                // call onClose callbacks after state update to avoid triggering
                // navigation or other updates during render
                if (toCall.length > 0) {
                  setTimeout(() => {
                    toCall.forEach((fn) => fn && fn());
                  }, 0);
                }

                return filtered;
              });
            };

            setModals([...modals]);
            return;
          }
        },

        push({ children, animation, onClose }: ModalPushProps) {
          setModals((modals) => [
            ...modals,
            {
              state: 'ACTIVE',
              id: ++countRef.current,
              children,
              animation,
              onClose,
            },
          ]);
          window.history.pushState({}, '', '');
        },
      };
    },
    [modals]
  );

  return (
    <>
      {modals.map((modal) => (
        <Modal key={modal.id} {...modal} />
      ))}
    </>
  );
});

ModalList.displayName = 'ModalList';

export default ModalList;
