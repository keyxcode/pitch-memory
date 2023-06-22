import { Cell, SoundCell } from "../types";

const isSoundCell = (cell: Cell): cell is SoundCell => {
  return !cell.isMiddleCell;
};

export { isSoundCell };
