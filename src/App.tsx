import { useMemo, useState } from "react";
import createRandomCells from "./utils/randomCellsGenerator";
import GlobalStyles from "./GlobalStyles";
import MainContainer from "./components/MainContainer";
import ResponsiveContainer from "./components/ResponsiveContainer";
import Board from "./components/Board";
import ButtonGroup from "./components/ButtonGroup";
import Footer from "./components/Footer";
import { Cell } from "./types";

const App = () => {
  const [numCells, setNumCells] = useState(9);
  const [turnsCount, setTurnsCount] = useState(0);
  const [message, setMessage] = useState(
    "find all the squares with the same pitch"
  );
  const [funFact, setFunFact] = useState("");

  const boardSize = useMemo(() => Math.sqrt(numCells), [numCells]);
  const boardMiddleId = useMemo(
    () => (numCells % 2 === 0 ? null : Math.floor(numCells / 2)),
    [numCells]
  );
  const numSoundCells = useMemo(
    () => (numCells % 2 === 0 ? numCells : numCells - 1),
    [numCells]
  );
  const minTurnsCount = useMemo(() => (numSoundCells * 3) / 4, [numSoundCells]);

  const [cells, setCells] = useState(createRandomCells(numSoundCells));

  const handleSelectCell = (id: number): void => {
    if (cells[id].selected === true) return;

    const newCells = cells.map((cell, i) =>
      i === id ? { ...cell, selected: true } : cell
    );
    setCells(newCells);

    const selectedCells = newCells.filter((cell) => cell.selected === true);
    const numSelectedCells = selectedCells.length;

    if (numSelectedCells === 1) return;

    if (numSelectedCells === 2) {
      const newTurnsCount = turnsCount + 1;
      setTurnsCount(newTurnsCount);

      if (guessesAreCorrect(selectedCells)) {
        const cellsMarkedCorrect = markSelectedCellsCorrect(newCells);
        if (gameIsOver(cellsMarkedCorrect)) {
          setMessage(`You win in ${newTurnsCount} turns! 🥳`);
          setFunFact(
            `Did you know that ${minTurnsCount} turns are the minimum to win this game with no lucky guess?`
          );
        }
      } else {
        setAllCellsUnselected();
      }
    }
  };

  const guessesAreCorrect = (selectedCells: Cell[]): boolean => {
    // console.log(selectedCells);
    if (selectedCells[0].sound === selectedCells[1].sound) return true;
    return false;
  };

  const markSelectedCellsCorrect = (cells: Cell[]): Cell[] => {
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

  const setAllCellsUnselected = (): void => {
    const newCells = cells.map((cell) => ({ ...cell, selected: false }));
    setTimeout(() => {
      setCells(newCells);
    }, 500);
  };

  const gameIsOver = (cells: Cell[]): boolean => {
    const numGuessedCells = cells.filter(
      (cell) => cell.guessed === true
    ).length;

    if (numGuessedCells === numSoundCells) return true;
    return false
  };

  const handleRestart = (): void => {
    const randomCells = createRandomCells(numSoundCells);
    const newCellsAllSelected = randomCells.map((cell) => ({
      ...cell,
      selected: true,
    }));
    setCells(newCellsAllSelected);

    setMessage("find all the squares with the same pitch");
    setFunFact("");
    setTurnsCount(0);

    setTimeout(() => {
      const newCells = newCellsAllSelected.map((cell) => ({
        ...cell,
        selected: false,
      }));
      setCells(newCells);
    }, 500);
  };

  const handleChangeNumCells = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // console.log("changed board size to", e.target.value);

    const newNumCells = parseInt(e.target.value);
    const newNumSoundCells =
      newNumCells % 2 === 0 ? newNumCells : newNumCells - 1;

    setNumCells(newNumCells);
    setCells(createRandomCells(newNumSoundCells));

    setMessage("find all the squares with the same pitch");
    setFunFact("");
    setTurnsCount(0);
  };

  return (
    <>
      <GlobalStyles />
      <MainContainer>
        <ResponsiveContainer>
          <Board
            boardMiddleId={boardMiddleId}
            boardSize={boardSize}
            numCells={numCells}
            handleSelectCell={handleSelectCell}
            cells={cells}
          />
          <ButtonGroup
            handleRestart={handleRestart}
            handleChangeNumCells={handleChangeNumCells}
            numCells={numCells}
            message={message}
            funFact={funFact}
          />
        </ResponsiveContainer>
        <Footer />
      </MainContainer>
    </>
  );
};

export default App;
