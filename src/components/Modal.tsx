import styled, { keyframes } from "styled-components";
import StyledButton from "./StyledButton";
import ResponsiveContainer from "./ResponsiveContainer";

interface ModalProps {
  turnsCount: number;
  luckyCount: number;
  numCells: number;
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
  position: relative;
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

const StyledCloseButton = styled(StyledButton)`
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -10px;
  left: calc(100% - 10px);
  background-color: var(--mid);
  color: var(--lighter);
  font-weight: bold;

  &:hover {
    color: var(--light);
  }
`;

const Modal = ({
  turnsCount,
  luckyCount,
  numCells,
  handleRestart,
  handleCloseModal,
}: ModalProps) => {
  const numSoundCells = numCells % 2 === 0 ? numCells : numCells - 1;
  const minTurnsCount = (numSoundCells * 3) / 4;

  return (
    <StyledModal>
      <ResponsiveContainer>
        <StyledModalContent>
          <StyledCloseButton onClick={handleCloseModal}>X</StyledCloseButton>
          <div>{`You won in ${turnsCount} turns (with ${luckyCount} lucky ${
            luckyCount <= 1 ? `guess` : `guesses`
          })! 🥳`}</div>
          <div
            style={{ fontStyle: "italic" }}
          >{`Did you know that it takes at least ${minTurnsCount} turns to win this game with no lucky guess?`}</div>
          <StyledModalButton onClick={handleRestart}>Restart</StyledModalButton>
        </StyledModalContent>
      </ResponsiveContainer>
    </StyledModal>
  );
};

export default Modal;
