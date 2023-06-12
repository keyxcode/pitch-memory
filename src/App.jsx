import { useState } from "react";
import Cell from "./components/Cell";

function App() {
  const [cells, setCells] = useState([
    { selected: false, pitch: "C3", guessed: false },
    { selected: false, pitch: "C4", guessed: false },
    { selected: false, pitch: "C3", guessed: false },
    { selected: false, pitch: "C4", guessed: false },
  ]);

  const handleSelect = (id) => {
    if (cells[id].selected === true) return;

    const newCells = cells.map((cell, i) =>
      i === id ? { ...cell, selected: true } : cell
    );
    setCells(newCells);

    const selectedCells = newCells.filter((cell) => cell.selected === true);
    const numSelectedCells = selectedCells.length;
    console.log("numSelectedCells", numSelectedCells);

    if (numSelectedCells === 1) return;

    if (numSelectedCells === 2) {
      if (guessesAreCorrect(selectedCells)) {
        const cellsMarkedCorrect = markSelectedCellsCorrect(newCells);
        return checkGameOver(cellsMarkedCorrect);
      } else {
        return setAllCellsUnselected();
      }
    }

    return console.log(
      `something wrong happened: num selected =${numSelectedCells}`
    );
  };

  const guessesAreCorrect = (selectedCells) => {
    if (selectedCells[0].pitch === selectedCells[1].pitch) return true;
    return false;
  };

  const markSelectedCellsCorrect = (cells) => {
    const newCells = cells.map((cell) =>
      cell.selected === true
        ? { ...cell, guessed: true, selected: false }
        : { ...cell, selected: false }
    );

    setTimeout(() => {
      setCells(newCells);
    }, 500);

    return newCells;
  };

  const setAllCellsUnselected = () => {
    const newCells = cells.map((cell) => ({ ...cell, selected: false }));
    return setTimeout(() => {
      setCells(newCells);
    }, 500);
  };

  const checkGameOver = (cells) => {
    const numGuessedCells = cells.filter(
      (cell) => cell.guessed === true
    ).length;
    if (numGuessedCells === cells.length) return console.log("you win");
  };

  return (
    <>
      {cells.map((cell, i) => (
        <Cell
          key={i}
          cellId={i}
          handleSelect={handleSelect}
          selected={cell.selected}
          pitch={cell.pitch}
          guessed={cell.guessed}
        />
      ))}
    </>
  );
}

export default App;
