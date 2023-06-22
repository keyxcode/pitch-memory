import soundsData from "../assets/sounds/soundsData";
import { Cell } from "../types";

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

const createRandomCells = (numCells: number): Cell[] => {
  // This function takes only even numbers
  // Assure there's a pair to every sound
  const halfRandomSounds = getRandomElements(soundsData, numCells / 2);
  const fullRandomSounds = [...halfRandomSounds, ...halfRandomSounds];
  const shuffledRandomSounds = shuffleArray(fullRandomSounds);

  const randomCells = Array(numCells)
    .fill({ selected: false, guessed: false, hadBeenSelected: false })
    .map((cell, id) => ({
      ...cell,
      sound: shuffledRandomSounds[id],
    }));

  // console.log("created new cells", randomCells);

  return randomCells;
};

export default createRandomCells;
