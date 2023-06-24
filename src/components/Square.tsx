import styled from "styled-components";
import useSound from "use-sound";
import { Sound } from "../types";

interface StyledSquareProps {
  onClick: () => void;
  selected: boolean;
  sound: Sound;
  guessed: boolean;
}

interface SoundSquareProps {
  id: string;
  handleSelect: (id: string) => void;
  selected: boolean;
  sound: Sound;
  guessed: boolean;
}

const StyledSquare = styled.div<StyledSquareProps>`
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

export const MiddleSquare = styled(StyledSquare)<any>`
  border: 0;
  cursor: default;
  background-color: var(--lighter);
`;

const SoundSquare = ({
  id: cellId,
  handleSelect,
  selected,
  sound,
  guessed,
}: SoundSquareProps) => {
  const [play] = useSound(sound?.path);

  const handleClick = (): void => {
    if (guessed) return;
    handleSelect(cellId);
    play();
  };

  // console.log("rendering cell");

  return (
    <StyledSquare
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
        {guessed && sound?.name}
        {/* {sound.name} */}
      </div>
    </StyledSquare>
  );
};

export default SoundSquare;
