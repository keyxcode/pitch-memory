import styled from "styled-components";
import useSound from "use-sound";
import C3 from "../sounds/C3.mp3";
import C4 from "../sounds/C4.mp3";

const StyledCell = styled.div`
  aspect-ratio: 1/1;
  border: ${({ guessed }) => (guessed ? `5px solid green` : `5px solid red`)};
  background-color: ${({ guessed, selected }) =>
    selected ? `lightcyan` : guessed ? `lightgreen` : `lightblue`};
  cursor: pointer;
  color: light;
`;

export const MiddleCell = styled(StyledCell)`
  border: 0;
  cursor: default;
`;

const Cell = ({ cellId, handleSelect, selected, pitch, guessed }) => {
  const [play] = useSound(pitch === "C3" ? C3 : C4);

  const handleClick = () => {
    if (guessed) return;
    handleSelect(cellId);
    play();
  };

  return (
    <StyledCell onClick={handleClick} guessed={guessed} selected={selected}>
      {/* {`Cell ${cellId} with pitch ${pitch} selected = ${selected} guessed = ${guessed}`} */}
    </StyledCell>
  );
};

export default Cell;
