import { useMemo, useState, useEffect, useRef } from "react";
import GlobalStyles from "./GlobalStyles";
import MainContainer from "./components/MainContainer";
import ResponsiveContainer from "./components/ResponsiveContainer";
import Board from "./components/Board";
import ButtonGroup from "./components/ButtonGroup";
import Footer from "./components/Footer";
import Confetti from "react-confetti";
import { Cell, SoundCell } from "./types";
import Header from "./components/Header";
import createRandomCells from "./utils/randomCellsGenerator";
import Modal from "./components/Modal";
import { isSoundCell } from "./utils/typeGuards";
import useLocalStorageNumber from "./hooks/useLocalStorageNumber";

const App = () => {
  const [numCells, setNumCells] = useLocalStorageNumber("numCells", 9);
  const [cells, setCells] = useState(() => createRandomCells(numCells));
  const [turnsCount, setTurnsCount] = useState(0);
  const [luckyCount, setLuckyCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [modalOpen, setModalOpen] = useState(true);

  const isFirstRender = useRef(true);

  useEffect(() => {
    setNumCells(numCells);
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

  const cellsMatch = (selectedCells: SoundCell[]): boolean => {
    if (selectedCells[0].sound === selectedCells[1].sound) return true;

    return false;
  };

  const isLucky = (
    cellJustSelected: SoundCell,
    currentCells: Cell[]
  ): boolean => {
    const soundCells = currentCells.filter(isSoundCell);
    const cellsNotYetOpened = soundCells.filter(
      (cell) => !cell.hadBeenSelected
    );

    // If the cell just opened had not been opened before, and
    // is not the only choices left => lucky
    if (!cellJustSelected.hadBeenSelected && cellsNotYetOpened.length >= 1) {
      console.log("lucky!");
      return true;
    }

    return false;
  };

  const markGuessedCells = (cells: Cell[]): Cell[] => {
    const newCells = cells.map((cell) =>
      !isSoundCell(cell)
        ? { ...cell }
        : cell.selected
        ? { ...cell, guessed: true, selected: false }
        : { ...cell, selected: false }
    );

    return newCells;
  };

  const gameIsOver = (cells: Cell[]): boolean => {
    const soundCells = cells.filter(isSoundCell);
    const gameIsOver = soundCells.every((cell) => cell.guessed === true);

    return gameIsOver;
  };

  const markAllCellsUnselected = (newCells: Cell[]): Cell[] => {
    const newCellsUnselected = newCells.map((cell) =>
      cell.isMiddleCell
        ? { ...cell }
        : {
            ...cell,
            selected: false,
          }
    );

    return newCellsUnselected;
  };

  const checkCellsMatch = (
    cellJustSelected: SoundCell,
    currentCells: Cell[]
  ): void => {
    const soundCells = currentCells.filter(isSoundCell);
    const selectedSoundCells = soundCells.filter(
      (cell) => cell.selected === true
    );
    const numSelectedCells = selectedSoundCells.length;

    if (numSelectedCells === 1) return;
    if (numSelectedCells === 2) {
      const newTurnsCount = turnsCount + 1;
      setTurnsCount(newTurnsCount);

      if (cellsMatch(selectedSoundCells)) {
        if (isLucky(cellJustSelected, currentCells)) {
          setLuckyCount((prev) => prev + 1);
        }

        const newCells = markGuessedCells(currentCells);
        setTimeout(() => {
          setCells(newCells);
        }, 500);

        if (gameIsOver(newCells)) {
          setGameOver(true);
        }
      } else {
        const newCells = markAllCellsUnselected(currentCells);

        setTimeout(() => {
          setCells(newCells);
        }, 500);
      }
    }
  };

  const handleSelectCell = (id: string): void => {
    const cellJustSelected = cells.find((cell) => cell.id === id);

    if (
      typeof cellJustSelected === "undefined" ||
      !isSoundCell(cellJustSelected) ||
      cellJustSelected.selected === true
    )
      return;

    // Update selected and hadBeenSelected
    const newCells = cells.map((cell) => {
      return cell.id === id
        ? { ...cell, selected: true, hadBeenSelected: true }
        : cell;
    });
    setCells(newCells);

    checkCellsMatch(cellJustSelected, newCells);
  };

  const flipAndShuffleBoard = (): void => {
    const randomCells = createRandomCells(numCells);
    setCells(randomCells);

    const newCellsAllSelected = randomCells.map((cell) =>
      cell.isMiddleCell
        ? { ...cell }
        : {
            ...cell,
            selected: true,
          }
    );

    setTimeout(() => {
      setCells(newCellsAllSelected);
    }, 0);

    setTimeout(() => {
      const newCells = newCellsAllSelected.map((cell) => ({
        ...cell,
        selected: false,
      }));
      setCells(newCells);
    }, 500);
  };

  const init = (): void => {
    setGameOver(false);
    setTurnsCount(0);
    setLuckyCount(0);
  };

  const handleRestart = (): void => {
    init();
    flipAndShuffleBoard();
  };

  useMemo(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    flipAndShuffleBoard();
  }, [numCells]);

  const handleChangeNumCells = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newNumCells = parseInt(e.target.value);
    setNumCells(newNumCells);
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
            numCells={numCells}
            handleRestart={handleRestart}
            handleCloseModal={handleCloseModal}
          />
        )}
        <ResponsiveContainer>
          {gameOver && numCells === 36 && <Confetti />}
          <Header />
          <Board
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
