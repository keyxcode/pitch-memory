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
  const [cells, setCells] = useState([
    { selected: false, sound: soundsData[0], guessed: false },
    { selected: false, sound: soundsData[0], guessed: false },
    { selected: false, sound: soundsData[0], guessed: false },
    { selected: false, sound: soundsData[0], guessed: false },
    { selected: false, sound: soundsData[0], guessed: false },
    { selected: false, sound: soundsData[0], guessed: false },
    { selected: false, sound: soundsData[0], guessed: false },
    { selected: false, sound: soundsData[0], guessed: false },

    { selected: false, sound: soundsData[0], guessed: false },
    { selected: false, sound: soundsData[0], guessed: false },
    { selected: false, sound: soundsData[0], guessed: false },
    { selected: false, sound: soundsData[0], guessed: false },
    { selected: false, sound: soundsData[0], guessed: false },
    { selected: false, sound: soundsData[0], guessed: false },
    { selected: false, sound: soundsData[0], guessed: false },
    { selected: false, sound: soundsData[0], guessed: false },
  ]);
  const [message, setMessage] = useState("");

  const selectRandomElInArray = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  const selectNRandomElsInArray = (arr, n) => {
    const randomEls = [];

    while (randomEls.length < n) {
      const id = selectRandomElInArray(arr);
      if (randomEls.includes(id)) continue;
      randomEls.push(id);
    }

    return randomEls;
  };

  const shuffleArray = (arr) => {
    let currentIndex = arr.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [arr[currentIndex], arr[randomIndex]] = [
        arr[randomIndex],
        arr[currentIndex],
      ];
    }

    return arr;
  };

  const randomizeCellsPitch = () => {
    // Figure out number of sound cells (9 -> 8, 16 -> 16, 24 -> 24)
    const numSoundCells = numCells % 2 === 0 ? numCells : numCells - 1;

    // Select (numSoundCells / 2) random ids from soundData (4, 8, 12)
    const partialRandomSounds = selectNRandomElsInArray(
      soundsData,
      numSoundCells / 2
    );

    // Create a new array with the random ids duplicated x 2
    const fullRandomSounds = [...partialRandomSounds, ...partialRandomSounds];

    // Shuffle the element positions in this new array
    const shuffledRandomSounds = shuffleArray(fullRandomSounds);
    console.log(shuffledRandomSounds);

    // Map these ids to a new pitch array
    const newCells = cells.map((cell, id) => ({
      ...cell,
      sound: shuffledRandomSounds[id],
    }));

    return newCells;
    // Map the pitch array to the cells pitches
  };

  // useEffect(() => {
  //   // Figure out number of sound cells (9 -> 8, 16 -> 16, 24 -> 24)
  //   const numSoundCells = numCells % 2 === 0 ? numCells : numCells - 1;

  //   // Select (numSoundCells / 2) random ids from soundData (4, 8, 12)
  //   const partialRandomSounds = selectNRandomElsInArray(
  //     soundsData,
  //     numSoundCells / 2
  //   );

  //   // Create a new array with the random ids duplicated x 2
  //   const fullRandomSounds = [...partialRandomSounds, ...partialRandomSounds];

  //   // Shuffle the element positions in this new array
  //   const shuffledRandomSounds = shuffleArray(fullRandomSounds);
  //   console.log(shuffledRandomSounds);

  //   // Map these ids to a new pitch array
  //   const newCells = cells.map((cell, id) => ({
  //     ...cell,
  //     sound: shuffledRandomSounds[id],
  //   }));
  //   setCells(newCells);
  //   console.log("rerendered", newCells);
  //   // Map the pitch array to the cells pitches
  // }, [numCells]);

  const handleSelect = (id) => {
    if (cells[id].selected === true) return;

    const newCells = cells.map((cell, i) =>
      i === id ? { ...cell, selected: true } : cell
    );
    setCells(newCells);

    const selectedCells = newCells.filter((cell) => cell.selected === true);
    const numSelectedCells = selectedCells.length;

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
    console.log(selectedCells);
    if (selectedCells[0].sound === selectedCells[1].sound) return true;
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
    if (numGuessedCells === numCells) setMessage("you win");
  };

  const handleRestart = () => {
    const randomizedPitchCells = randomizeCellsPitch();
    const newCells = randomizedPitchCells.map((cell) => ({
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
                    sound={cells[i].sound}
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
                    sound={cells[i - 1].sound}
                    guessed={cells[i - 1].guessed}
                  />
                )
              )}
          </StyledBoard>
        ) : (
          <StyledBoard boardSize={boardSize}>
            {new Array(numCells).fill(0).map((_el, i) => (
              <Cell
                key={i}
                cellId={i}
                handleSelect={handleSelect}
                selected={cells[i].selected}
                sound={cells[i].sound}
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
