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
  const [luckyCount, setLuckyCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [modalOpen, setModalOpen] = useState(true);

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
      }, 1000);
    } else {
      setModalOpen(false);
    }
  }, [gameOver]);

  const handleSelectCell = (id: number): void => {
    // console.log(id, cells[id].selectCount, cells[id]);
    const cellJustSelected = cells[id];
    if (cellJustSelected.selected === true) return;

    // Update selected and selectCount
    const newSelectCount = cellJustSelected.selectCount + 1;
    const newCells = cells.map((cell, i) => {
      return i === id
        ? { ...cell, selected: true, selectCount: newSelectCount }
        : cell;
    });
    setCells(newCells);
    // console.log(newCells);

    // Find currently selected cells
    const selectedCells = newCells.filter((cell) => cell.selected === true);
    const numSelectedCells = selectedCells.length;

    if (numSelectedCells === 1) return;
    if (numSelectedCells === 2) {
      const newTurnsCount = turnsCount + 1;
      setTurnsCount(newTurnsCount);

      if (selectedCellsAreCorrect(selectedCells)) {
        checkLucky(cellJustSelected, newCells);
        const guessedCells = markGuessedCells(newCells);
        checkGameOver(guessedCells);
      } else {
        setAllCellsUnselected(newCells);
      }
    }
  };

  const checkLucky = (cellJustSelected: Cell, currentCells: Cell[]): void => {
    // console.log(cells);
    // console.log(`lucky count ${luckyCount}`);

    const cellsNotYetOpened = currentCells.filter(
      (cell) => cell.selectCount === 0
    );
    // console.log(cellJustSelected);
    // console.log(cellsNotYetOpened);

    if (cellJustSelected.selectCount === 0 && cellsNotYetOpened.length >= 1) {
      console.log("lucky!");
      setLuckyCount((prev) => prev + 1);
    }
  };

  const selectedCellsAreCorrect = (selectedCells: Cell[]): boolean => {
    // console.log(selectedCells);
    if (selectedCells[0].sound === selectedCells[1].sound) return true;

    return false;
  };

  const markGuessedCells = (cells: Cell[]): Cell[] => {
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

  const setAllCellsUnselected = (newCells: Cell[]): void => {
    const newCellsUnselected = newCells.map((cell) => ({
      ...cell,
      selected: false,
    }));
    setTimeout(() => {
      // console.log("set unselected");
      setCells(newCellsUnselected);
    }, 500);
  };

  const checkGameOver = (cells: Cell[]): void => {
    const gameIsOver = cells.every((cell) => cell.guessed === true);

    if (gameIsOver) {
      setGameOver(true);
    }
  };

  const init = (): void => {
    setGameOver(false);
    setTurnsCount(0);
    setLuckyCount(0);
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
            turnsCount={turnsCount}
            luckyCount={luckyCount}
            minTurnsCount={minTurnsCount}
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
