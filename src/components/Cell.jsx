import styled from "styled-components";
import useSound from "use-sound";

const StyledCell = styled.div`
  aspect-ratio: 1/1;
  border: ${({ guessed }) => (guessed ? `4px solid green` : `4px solid red`)};
  background-color: ${({ guessed, selected }) =>
    selected ? `lightcyan` : guessed ? `lightgreen` : `var(--lighter)`};
  cursor: pointer;
  color: var(--darker);
  overflow: hidden;
  border-radius: var(--s);
  transform: ${({ selected }) => (selected ? `rotateY(180deg)` : `rotateY(0)`)};
  transition: all ease-in 0.4s;
  font-weight: bold;
  font-size: var(--l);

  &:hover {
    filter: ${({ sound }) => sound && `brightness(0.9)`};
  }
`;

export const MiddleCell = styled(StyledCell)`
  border: 0;
  cursor: default;
`;

const Cell = ({ cellId, handleSelect, selected, sound, guessed }) => {
  const [play] = useSound(sound.path, { volume: 4 });

  const handleClick = () => {
    if (guessed) return;
    handleSelect(cellId);
    play();
  };

  // console.log("rendering cell");

  return (
    <StyledCell
      onClick={handleClick}
      guessed={guessed}
      selected={selected}
      sound={sound}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        {guessed && sound.name}
      </div>
    </StyledCell>
  );
};

export default Cell;
