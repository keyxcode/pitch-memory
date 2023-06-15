import { useEffect, useState } from "react";
import Cell, { MiddleCell } from "./components/Cell";
import styled from "styled-components";
import BootstrapContainer from "./components/BootstrapContainer";
import GlobalStyles from "./GlobalStyles";
import soundsData from "./sounds/soundsData";

const StyledBoard = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: ${({ boardSize }) => `repeat(${boardSize}, 1fr)`};
  align-items: center;
  grid-gap: 8px;
`;

function App() {
  const [numCells, setNumCells] = useState(9);
  const [pitchIds, setPitchIds] = useState([]);
  const [cells, setCells] = useState([
    { selected: false, pitch: soundsData[0], guessed: false },
    { selected: false, pitch: soundsData[1], guessed: false },
    { selected: false, pitch: soundsData[0], guessed: false },
    { selected: false, pitch: soundsData[1], guessed: false },
    { selected: false, pitch: soundsData[0], guessed: false },
    { selected: false, pitch: soundsData[1], guessed: false },
    { selected: false, pitch: soundsData[0], guessed: false },
    { selected: false, pitch: soundsData[1], guessed: false },

    // { selected: false, pitch: "C3", guessed: false },
    // { selected: false, pitch: "C4", guessed: false },
    // { selected: false, pitch: "C3", guessed: false },
    // { selected: false, pitch: "C4", guessed: false },
    // { selected: false, pitch: "C3", guessed: false },
    // { selected: false, pitch: "C4", guessed: false },
    // { selected: false, pitch: "C3", guessed: false },
    // { selected: false, pitch: "C4", guessed: false },
  ]);
  const [message, setMessage] = useState("");

  const randomizePitchIds = () => {
    // Figure out number of sound cells (9 -> 8, 16 -> 16, 24 -> 24)
    const numSoundCells =
      numCells % 2 === 0 ? numSoundCells : numSoundCells - 1;
    console.log(numSoundCells);
    // Select (numSoundCells / 2) random ids from soundData (4, 8, 12)
    // Create a new array with the random ids duplicated x 2
    // Randomize the element positions in this new array
    // Map these ids to a new pitch array
    // Map the pitch array to the cells pitches
  };

  useEffect(() => {
    // randomizePitchIds();
  }, [numCells]);

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
    if (numGuessedCells === cells.length) setMessage("you win");
  };

  const handleRestart = () => {
    const newCells = cells.map((cell) => ({
      ...cell,
      selected: false,
      guessed: false,
    }));
    setCells(newCells);

    setMessage("");
  };

  const boardSize = Math.sqrt(numCells);
  const boardMiddleId = boardSize % 2 === 0 ? null : Math.floor(numCells / 2);

  return (
    <>
      <GlobalStyles />
      <BootstrapContainer>
        {boardMiddleId ? (
          <StyledBoard boardSize={boardSize}>
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
        <div>{message && message}</div>
        <button onClick={handleRestart}>Restart</button>
      </BootstrapContainer>
    </>
  );
}

export default App;
