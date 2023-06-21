import styled, { keyframes } from "styled-components";
import StyledButton from "./StyledButton";
import ResponsiveContainer from "./ResponsiveContainer";

interface ModalProps {
  turnsCount: number;
  minTurnsCount: number;
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

const dropDown = keyframes`
    from {
        transform: translate(0, -50px);
        opacity: 0;
    }
    to {
        transform: translate(0, 0);
        opacity: 1;
    }
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
  animation: ${dropDown} 0.5s ease-out;
`;

const StyledModalButton = styled(StyledButton)`
  width: 50%;
`;

const Modal = ({
  turnsCount,
  minTurnsCount,
  handleRestart,
  handleCloseModal,
}: ModalProps) => (
  <StyledModal onClick={handleCloseModal}>
    <ResponsiveContainer>
      <StyledModalContent>
        <div>{`You win in ${turnsCount} turns! 🥳`}</div>
        <div
          style={{ fontStyle: "italic" }}
        >{`Did you know that ${minTurnsCount} turns are the minimum to win this game with no lucky guess?`}</div>
        <StyledModalButton onClick={handleRestart}>Restart</StyledModalButton>
      </StyledModalContent>
    </ResponsiveContainer>
  </StyledModal>
);

export default Modal;
