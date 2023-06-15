import { useMemo, useState } from "react";
import Cell, { MiddleCell } from "./components/Cell";
import styled from "styled-components";
import BootstrapContainer from "./components/BootstrapContainer";
import GlobalStyles from "./GlobalStyles";
import soundsData from "./sounds/soundsData";

const selectRandomElInArray = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const getRandomElements = (arr, n) => {
  let arrClone = arr.slice();
  console.log(soundsData.length);
  const randomElements = [];

  while (randomElements.length < n) {
    console.log("generating...");
    const el = selectRandomElInArray(arrClone);
    console.log("el", el);
    arrClone = arrClone.filter((e) => e != el);
    randomElements.push(el);
  }

  return randomElements;
};

const shuffleArray = (arr) => {
  let currentIndex = arr.length;
  let randomIndex;

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

const createRandomCells = (numCells) => {
  if (numCells % 2 != 0)
    return console.log("This function takes only even num");

  // This is to assure there's a pair to every sound
  const halfRandomSounds = getRandomElements(soundsData, numCells / 2);
  const fullRandomSounds = [...halfRandomSounds, ...halfRandomSounds];
  const shuffledRandomSounds = shuffleArray(fullRandomSounds);

  const randomCells = Array(numCells)
    .fill({ selected: false, guessed: false })
    .map((cell, id) => ({
      ...cell,
      sound: shuffledRandomSounds[id],
    }));

  console.log("created new cells", randomCells);

  return randomCells;
};

//=================================================================================
const StyledBoard = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: ${({ boardSize }) => `repeat(${boardSize}, 1fr)`};
  align-items: center;
  grid-gap: 8px;
`;

//=================================================================================
const App = () => {
  const [numCells, setNumCells] = useState(9);
  const [message, setMessage] = useState("");

  const boardSize = useMemo(() => Math.sqrt(numCells), [numCells]);
  const boardMiddleId = useMemo(
    () => (numCells % 2 === 0 ? null : Math.floor(numCells / 2)),
    [numCells]
  );
  const numSoundCells = useMemo(
    () => (numCells % 2 === 0 ? numCells : numCells - 1),
    [numCells]
  );

  const [cells, setCells] = useState(createRandomCells(numSoundCells));

  const handleSelectCell = (id) => {
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
    const newCells = createRandomCells(numSoundCells);
    setCells(newCells);

    setMessage("");
  };

  const handleChangeNumCells = (e) => {
    console.log("changed board size to", e.target.value);

    const newNumCells = parseInt(e.target.value);
    const newNumSoundCells =
      newNumCells % 2 === 0 ? newNumCells : newNumCells - 1;

    setNumCells(newNumCells);
    setCells(createRandomCells(newNumSoundCells));
  };

  return (
    <>
      <GlobalStyles />
      <BootstrapContainer>
        {boardMiddleId ? (
          <StyledBoard boardSize={boardSize}>
            {new Array(numCells)
              .fill(0)
              .map((_el, i) =>
                i < boardMiddleId ? (
                  <Cell
                    key={i}
                    cellId={i}
                    handleSelect={handleSelectCell}
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
                    handleSelect={handleSelectCell}
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
                handleSelect={handleSelectCell}
                selected={cells[i].selected}
                sound={cells[i].sound}
                guessed={cells[i].guessed}
              />
            ))}
          </StyledBoard>
        )}
        <div>{message && message}</div>
        <button onClick={handleRestart}>Restart</button>
        <select onChange={handleChangeNumCells} value={numCells}>
          <option value={9}>3 x 3</option>
          <option value={16}>4 x 4</option>
          <option value={25}>5 x 5</option>
          <option value={36}>6 x 6</option>
        </select>
      </BootstrapContainer>
    </>
  );
};

export default App;
