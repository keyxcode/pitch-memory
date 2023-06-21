import styled from "styled-components";
import StyledButton from "./StyledButton";
import ResponsiveContainer from "./ResponsiveContainer";

interface ModalProps {
  message: string;
  funFact: string;
  handleRestart: () => void;
  handleCloseModal: () => void;
}

const StyledModal = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  z-index: 1;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledModalContent = styled.div`
  background-color: var(--lighter);
  border: var(--xs) solid var(--mid);
  border-radius: var(--s);
  min-height: 100px;
  padding: var(--l);
  display: flex;
  flex-direction: column;
  row-gap: var(--md);
  align-items: center;
`;

const StyledModalButton = styled(StyledButton)`
  width: 50%;
`;

const Modal = ({
  message,
  funFact,
  handleRestart,
  handleCloseModal,
}: ModalProps) => (
  <StyledModal onClick={handleCloseModal}>
    <ResponsiveContainer>
      <StyledModalContent>
        <div>{message}</div>
        <div style={{ fontStyle: "italic" }}>{funFact}</div>
        <StyledModalButton onClick={handleRestart}>Restart</StyledModalButton>
      </StyledModalContent>
    </ResponsiveContainer>
  </StyledModal>
);

export default Modal;
