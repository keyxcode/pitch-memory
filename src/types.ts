export interface Sound {
  path: string;
  name: string;
}

export interface Cell {
  sound: Sound;
  selected: boolean;
  guessed: boolean;
  hadBeenSelected: boolean;
}
