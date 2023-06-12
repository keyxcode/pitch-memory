import { useState } from "react";
import Cell from "./components/Cell";

function App() {
  const [selected, setSelected] = useState([false, false, false, false]);
  const [pitches, setPitches] = useState(["C3", "C4", "C3", "C4"]);

  const handleSelect = (id) => {
    if (selected[id] === true) return;

    if (selected.filter((el) => el === true).length < 2) {
      const newSelected = selected.map((value, i) =>
        i === id ? !value : value
      );
      setSelected(newSelected);
      return;
    }

    const newSelected = [false, false, false, false];
    newSelected[id] = true;
    setSelected(newSelected);
  };

  const checkSamePitch = () => {};

  return (
    <>
      {pitches.map((pitch, i) => (
        <Cell
          key={i}
          cellId={i}
          handleSelect={handleSelect}
          selected={selected[i]}
          sound={pitch}
        />
      ))}
    </>
  );
}

export default App;
