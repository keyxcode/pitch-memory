import styled from "styled-components";
import Cell, { MiddleCell } from "./Cell";
import { Cell as CellInterface } from "../types";

interface BoardProps {
  boardMiddleId: number | null;
  boardSize: number;
  numCells: number;
  handleSelectCell: (id: number) => void;
  cells: CellInterface[];
}

const StyledBoard = styled.div<Pick<BoardProps, "boardSize">>`
  width: 100%;
  display: grid;
  grid-template-columns: ${({ boardSize }) => `repeat(${boardSize}, 1fr)`};
  align-items: center;
  gap: var(--s);
  margin-bottom: var(--md);
`;

const Board = ({
  boardMiddleId,
  boardSize,
  numCells,
  handleSelectCell,
  cells,
}: BoardProps) => (
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
