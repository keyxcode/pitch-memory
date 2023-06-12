import useSound from "use-sound";
import C3 from "../sounds/C3.mp3";
import C4 from "../sounds/C4.mp3";

const Cell = ({ cellId, handleSelect, selected, sound }) => {
  const [play] = useSound(sound === "C3" ? C3 : C4);

  const handleClick = () => {
    handleSelect(cellId);
    play();
  };

  return (
    <div onClick={handleClick} style={{ border: "1px solid red" }}>
      {`I'm sound ${selected && "selected"}`}
    </div>
  );
};

export default Cell;
