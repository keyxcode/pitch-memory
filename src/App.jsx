import { useState } from "react";
import Cell, { MiddleCell } from "./components/Cell";
import styled from "styled-components";
import BootstrapContainer from "./components/BootstrapContainer";
import GlobalStyles from "./GlobalStyles";

function App() {
  const [numCells, setNumCells] = useState(9);
  const [cells, setCells] = useState([
    { selected: false, pitch: "C3", guessed: false },
    { selected: false, pitch: "C4", guessed: false },
    { selected: false, pitch: "C3", guessed: false },
    { selected: false, pitch: "C4", guessed: false },
    { selected: false, pitch: "C3", guessed: false },
    { selected: false, pitch: "C4", guessed: false },
    { selected: false, pitch: "C3", guessed: false },
    { selected: false, pitch: "C4", guessed: false },

    { selected: false, pitch: "C3", guessed: false },
    { selected: false, pitch: "C4", guessed: false },
    { selected: false, pitch: "C3", guessed: false },
    { selected: false, pitch: "C4", guessed: false },
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
      `something wrong happened: num selected = ${numSelectedCells}`
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

  const boardSize = Math.sqrt(numCells);
  const boardMiddleId = boardSize % 2 === 0 ? null : Math.floor(numCells / 2);

  const StyledBoard = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(${boardSize}, 1fr);
    align-items: center;
    grid-gap: 8px;
  `;

  return (
    <>
      <GlobalStyles />
      <BootstrapContainer>
        {boardMiddleId ? (
          <StyledBoard>
            {new Array(numCells)
              .fill(0)
              .map((_el, i) =>
                i < 4 ? (
                  <Cell
                    key={i}
                    cellId={i}
                    handleSelect={handleSelect}
                    selected={cells[i].selected}
                    pitch={cells[i].pitch}
                    guessed={cells[i].guessed}
                  />
                ) : i === boardMiddleId ? (
                  <MiddleCell key={i} />
                ) : (
                  <Cell
                    key={i}
                    cellId={i - 1}
                    handleSelect={handleSelect}
                    selected={cells[i - 1].selected}
                    pitch={cells[i - 1].pitch}
                    guessed={cells[i - 1].guessed}
                  />
                )
              )}
          </StyledBoard>
        ) : (
          <StyledBoard>
            {new Array(numCells).fill(0).map((_el, i) => (
              <Cell
                key={i}
                cellId={i}
                handleSelect={handleSelect}
                selected={cells[i].selected}
                pitch={cells[i].pitch}
                guessed={cells[i].guessed}
              />
            ))}
          </StyledBoard>
        )}
      </BootstrapContainer>
    </>
  );
}

export default App;
