export interface Sound {
  path: string;
  name: string;
}

export interface MiddleCell {
  isMiddleCell: boolean;
  id: string;
}

export interface SoundCell extends MiddleCell {
  sound: Sound;
  selected: boolean;
  guessed: boolean;
  hadBeenSelected?: boolean;
}

export type Cell = MiddleCell | SoundCell;
