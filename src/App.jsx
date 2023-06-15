import { useCallback, useMemo, useState, useEffect } from "react";
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

  const boardSize = useMemo(() => Math.sqrt(numCells), [numCells]);
  const boardMiddleId = useMemo(
    () => (numCells % 2 === 0 ? null : Math.floor(numCells / 2)),
    [numCells]
  );
  const numSoundCells = useMemo(
    () => (numCells % 2 === 0 ? numCells : numCells - 1),
    [numCells]
  );

  const selectRandomElInArray = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  const getRandomElements = useCallback((arr, n) => {
    const randomElements = [];

    while (randomElements.length < n) {
      const el = selectRandomElInArray(arr);
      if (randomElements.includes(el)) continue;
      randomElements.push(el);
    }

    return randomElements;
  }, []);

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

  const createRandomCells = useCallback(() => {
    // This is to assure there's a pair to every sound
    const halfRandomSounds = getRandomElements(soundsData, numSoundCells / 2);
    const fullRandomSounds = [...halfRandomSounds, ...halfRandomSounds];
    const shuffledRandomSounds = shuffleArray(fullRandomSounds);

    const randomCells = Array(numSoundCells)
      .fill({ selected: false, guessed: false })
      .map((cell, id) => ({
        ...cell,
        sound: shuffledRandomSounds[id],
      }));

    console.log("created new cells", randomCells);

    return randomCells;
  }, [numSoundCells, getRandomElements]);

  useEffect(() => {
    const newCells = createRandomCells();
    setCells(newCells);
  }, [createRandomCells]);

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

  const handleRestart = useCallback(() => {
    const newCells = createRandomCells();
    setCells(newCells);

    setMessage("");
  }, [createRandomCells]);

  const handleChangeNumCells = (e) => {
    console.log("changed board size to", e.target.value);
    setNumCells(parseInt(e.target.value));
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
                i < 4 ? (
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
          <option value={9}>9 x 9</option>
          <option value={16}>16 x 16</option>
        </select>
      </BootstrapContainer>
    </>
  );
}

export default App;
