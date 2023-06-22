import soundsData from "../assets/sounds/soundsData";
import { Cell } from "../types";
import { v4 as uuid } from "uuid";

const selectRandomElInArray = (arr: any[]) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const getRandomElements = (arr: any[], n: number) => {
  let arrClone = arr.slice();
  const randomElements = [];

  while (randomElements.length < n) {
    const el = selectRandomElInArray(arrClone);
    arrClone = arrClone.filter((e) => e != el);
    randomElements.push(el);
  }

  return randomElements;
};

const shuffleArray = (arr: any[]) => {
  let currentIndex = arr.length;
  let randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [arr[currentIndex], arr[randomIndex]] = [
      arr[randomIndex],
      arr[currentIndex],
    ];
  }

  return arr;
};

const insertElMiddleArray = (arr: any[], el: any) => {
  const idToInsert = Math.floor(arr.length / 2);

  const arrCopy = arr.slice();
  arrCopy.splice(idToInsert, 0, el);

  return arrCopy;
};

const createRandomCells = (numCells: number): Cell[] => {
  const isEvenBoard = numCells % 2 === 0;

  const numSoundCells = isEvenBoard ? numCells : numCells - 1;
  const halfRandomSounds = getRandomElements(soundsData, numSoundCells / 2);
  const fullRandomSounds = [...halfRandomSounds, ...halfRandomSounds];
  const shuffledRandomSounds = shuffleArray(fullRandomSounds);

  const randomSoundCells = Array(numSoundCells)
    .fill({
      selected: false,
      guessed: false,
      hadBeenSelected: false,
      isMiddleCell: false,
    })
    .map((cell, id) => ({
      ...cell,
      id: uuid(),
      sound: shuffledRandomSounds[id],
    }));

  const middleCell = {
    id: uuid(),
    isMiddleCell: true,
  };

  const fullCells = isEvenBoard
    ? randomSoundCells
    : insertElMiddleArray(randomSoundCells, middleCell);

  return fullCells;
};

export default createRandomCells;
