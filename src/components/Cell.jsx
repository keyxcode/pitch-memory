import useSound from "use-sound";
import C3 from "../sounds/C3.mp3";
import C4 from "../sounds/C4.mp3";

const Cell = ({ cellId, handleSelect, selected, pitch, guessed }) => {
  const [play] = useSound(pitch === "C3" ? C3 : C4);

  const handleClick = () => {
    if (guessed) return;
    handleSelect(cellId);
    play();
  };

  return (
    <div
      onClick={handleClick}
      style={
        guessed ? { border: "1px solid green" } : { border: "1px solid red" }
      }
    >
      {`Cell ${cellId} with pitch ${pitch} selected = ${selected} guessed = ${guessed}`}
    </div>
  );
};

export default Cell;
