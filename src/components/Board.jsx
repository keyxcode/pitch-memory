import styled from "styled-components";
import Cell, { MiddleCell } from "./Cell";

const StyledBoard = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: ${({ boardSize }) => `repeat(${boardSize}, 1fr)`};
  align-items: center;
  gap: var(--s);
`;

const Board = ({
  boardMiddleId,
  boardSize,
  numCells,
  handleSelectCell,
  cells,
}) => (
  <>
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
  </>
);

export default Board;
