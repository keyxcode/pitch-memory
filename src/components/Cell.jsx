import styled from "styled-components";
import useSound from "use-sound";

const StyledCell = styled.div`
  aspect-ratio: 1/1;
  border: ${({ guessed }) => (guessed ? `5px solid green` : `5px solid red`)};
  background-color: ${({ guessed, selected }) =>
    selected ? `lightcyan` : guessed ? `lightgreen` : `lightskyblue`};
  cursor: pointer;
  color: light;
`;

export const MiddleCell = styled(StyledCell)`
  border: 0;
  cursor: default;
`;

const Cell = ({ cellId, handleSelect, selected, sound, guessed }) => {
  const [play] = useSound(sound);

  const handleClick = () => {
    if (guessed) return;
    handleSelect(cellId);
    play();
  };

  // console.log("rendering cell");

  return (
    <StyledCell onClick={handleClick} guessed={guessed} selected={selected}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          fontSize: 24,
        }}
      >
        {guessed &&
          String(sound).replace("/src/sounds/", "").replace(".mp3", "")}
      </div>
    </StyledCell>
  );
};

export default Cell;
