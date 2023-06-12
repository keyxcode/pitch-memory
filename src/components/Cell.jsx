import styled from "styled-components";
import useSound from "use-sound";
import C3 from "../sounds/C3.mp3";
import C4 from "../sounds/C4.mp3";

const StyledCell = styled.div`
  background-color: lightblue;
  aspect-ratio: 1/1;
  border: ${(props) => (props.guessed ? `5px solid green` : `5px solid red`)};
  cursor: pointer;
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
    <StyledCell
      onClick={handleClick}
      guessed={guessed}
      style={
        guessed ? { border: "5px solid green" } : { border: "5px solid red" }
      }
    >
      {/* {`Cell ${cellId} with pitch ${pitch} selected = ${selected} guessed = ${guessed}`} */}
    </StyledCell>
  );
};

export default Cell;
