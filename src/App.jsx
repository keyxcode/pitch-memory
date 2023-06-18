import { useMemo, useState } from "react";
import createRandomCells from "./utils/randomCellsGenerator";
import Cell, { MiddleCell } from "./components/Cell";
import GlobalStyles from "./GlobalStyles";
import MainContainer from "./components/MainContainer";
import ResponsiveContainer from "./components/ResponsiveContainer";
import StyledBoard from "./components/StyledBoard";
import StyledButtonGroup from "./components/StyledButtonGroup";
import StyledButton from "./components/StyledButton";
import StyledSelect from "./components/StyledSelect";
import Footer from "./components/Footer";

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
        return setAllCellsUnselected();
      }
    }
  };

  const guessesAreCorrect = (selectedCells) => {
    // console.log(selectedCells);
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

  const gameIsOver = (cells) => {
    const numGuessedCells = cells.filter(
      (cell) => cell.guessed === true
    ).length;

    if (numGuessedCells === numSoundCells) return true;
  };

  const handleRestart = () => {
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

  const handleChangeNumCells = (e) => {
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
          <StyledButtonGroup>
            <StyledButton onClick={handleRestart}>Restart</StyledButton>
            <StyledSelect onChange={handleChangeNumCells} value={numCells}>
              <option value={9}>3 x 3</option>
              <option value={16}>4 x 4</option>
              <option value={25}>5 x 5</option>
              <option value={36}>6 x 6</option>
            </StyledSelect>
            <div>{message}</div>
            <div style={{ fontStyle: "italic" }}>{funFact}</div>
          </StyledButtonGroup>
        </ResponsiveContainer>
        <Footer />
      </MainContainer>
    </>
  );
};

export default App;
