import styled from "styled-components";
import useSound from "use-sound";
import { Sound } from "../types";

interface StyledCellProps {
  onClick: () => void;
  selected: boolean;
  sound: Sound;
  guessed: boolean;
}

interface CellProps {
  handleSelect: (id: number) => void;
  cellId: number;
  selected: boolean;
  sound: Sound;
  guessed: boolean;
}

const StyledCell = styled.div<StyledCellProps>`
  aspect-ratio: 1/1;
  border: ${(p) =>
    p.guessed ? `4px solid var(--dark)` : `4px solid var(--mid)`};
  background-color: ${(p) =>
    p.selected ? `lightcyan` : p.guessed ? `lightgreen` : `var(--lighter)`};
  cursor: pointer;
  color: var(--darker);
  overflow: hidden;
  border-radius: var(--s);
  transform: ${(p) => (p.selected ? `rotateY(180deg)` : `rotateY(0)`)};
  transition: all ease-in 0.4s;
  font-weight: bold;
  font-size: var(--l);

  &:hover {
    filter: ${(p) => p.sound && `brightness(0.9)`};
  }
`;

export const MiddleCell = styled(StyledCell) <any>`
  border: 0;
  cursor: default;
  background-color: var(--lighter);
`;

const Cell = ({ cellId, handleSelect, selected, sound, guessed }: CellProps) => {
  const [play] = useSound(sound.path, { volume: 2 });

  const handleClick = (): void => {
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
