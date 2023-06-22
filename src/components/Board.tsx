import styled from "styled-components";
import SoundSquare, { MiddleSquare } from "./Square";
import { Cell as CellInterface } from "../types";
import { isSoundCell } from "../utils/typeGuards";

interface StyledBoardProps {
  boardSize: number;
}

interface BoardProps {
  numCells: number;
  handleSelectCell: (id: string) => void;
  cells: CellInterface[];
}

const StyledBoard = styled.div<StyledBoardProps>`
  width: 100%;
  display: grid;
  grid-template-columns: ${({ boardSize }) => `repeat(${boardSize}, 1fr)`};
  align-items: center;
  gap: var(--s);
  margin-bottom: var(--md);
`;

const Board = ({ numCells, handleSelectCell, cells }: BoardProps) => {
  const boardSize = Math.sqrt(numCells);
  return (
    <>
      <StyledBoard boardSize={boardSize}>
        {cells.map((cell) =>
          isSoundCell(cell) ? (
            <SoundSquare
              key={cell.id}
              id={cell.id}
              handleSelect={handleSelectCell}
              selected={cell.selected}
              sound={cell.sound}
              guessed={cell.guessed}
            />
          ) : (
            <MiddleSquare key={cell.id} />
          )
        )}
      </StyledBoard>
    </>
  );
};

export default Board;
