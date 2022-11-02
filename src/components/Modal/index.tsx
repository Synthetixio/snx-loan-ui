import { useRef } from 'react';
import styled from 'styled-components';
import { useOnClickOutside } from 'usehooks-ts';

type ModalProps = {
  isShow: boolean;
  children: JSX.Element;
  onClose: () => void;
};

const Modal = ({ isShow, children, onClose }: ModalProps): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, onClose);

  return (
    <Overlay show={isShow}>
      <InnerPopup ref={ref}>{children}</InnerPopup>
    </Overlay>
  );
};

export default Modal;

const Overlay = styled.div<{ show: boolean }>`
  visibility: ${({ show }) => (show ? `visible` : `hidden`)};
  opacity: ${({ show }) => (show ? `1` : `0`)};
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  transition: opacity 500ms;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const InnerPopup = styled.div`
  display: inline-box;
  transition: all 5s ease-in-out;
`;
