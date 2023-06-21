import { useMemo, useState, useEffect } from "react";
import GlobalStyles from "./GlobalStyles";
import MainContainer from "./components/MainContainer";
import ResponsiveContainer from "./components/ResponsiveContainer";
import Board from "./components/Board";
import ButtonGroup from "./components/ButtonGroup";
import Footer from "./components/Footer";
import Confetti from "react-confetti";
import { Cell } from "./types";
import Header from "./components/Header";
import createRandomCells from "./utils/randomCellsGenerator";
import getLocalStorageNumCells from "./utils/localStorage";
import Modal from "./components/Modal";

const App = () => {
  const [numCells, setNumCells] = useState(getLocalStorageNumCells());
  const [turnsCount, setTurnsCount] = useState(0);
  const [message, setMessage] = useState("");
  const [funFact, setFunFact] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

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

  useEffect(() => {
    window.localStorage.setItem("numCells", numCells.toString());
  }, [numCells]);

  useEffect(() => {
    if (gameOver) {
      setTimeout(() => {
        setModalOpen(true);
      }, 3000);
    } else {
      setModalOpen(false);
    }
  }, [gameOver]);

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
        checkGameOver(cellsMarkedCorrect, newTurnsCount);
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
    return cells.every((cell) => cell.guessed === true);
  };

  const checkGameOver = (cells: Cell[], turnsCount: number): void => {
    if (gameIsOver(cells)) {
      setGameOver(true);
      setMessage(`You win in ${turnsCount} turns! 🥳`);
      setFunFact(
        `Did you know that ${minTurnsCount} turns are the minimum to win this game with no lucky guess?`
      );
    }
  };

  const init = (): void => {
    setGameOver(false);
    setMessage("");
    setFunFact("");
    setTurnsCount(0);
  };

  const handleRestart = (): void => {
    const randomCells = createRandomCells(numSoundCells);
    const newCellsAllSelected = randomCells.map((cell) => ({
      ...cell,
      selected: true,
    }));
    setCells(newCellsAllSelected);

    init();

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

    init();
  };

  const handleCloseModal = (): void => {
    setModalOpen(false);
  };

  return (
    <>
      <GlobalStyles />
      <MainContainer>
        {modalOpen && (
          <Modal
            message={message}
            funFact={funFact}
            handleRestart={handleRestart}
            handleCloseModal={handleCloseModal}
          />
        )}
        <ResponsiveContainer>
          {gameOver && numCells === 36 && <Confetti />}
          <Header />
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
          />
        </ResponsiveContainer>
        <Footer />
      </MainContainer>
    </>
  );
};

export default App;
