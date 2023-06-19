import soundsData from "../assets/sounds/soundsData";

const selectRandomElInArray = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const getRandomElements = (arr, n) => {
  let arrClone = arr.slice();
  console.log(soundsData.length);
  const randomElements = [];

  while (randomElements.length < n) {
    console.log("generating...");
    const el = selectRandomElInArray(arrClone);
    console.log("el", el);
    arrClone = arrClone.filter((e) => e != el);
    randomElements.push(el);
  }

  return randomElements;
};

const shuffleArray = (arr) => {
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

const createRandomCells = (numCells) => {
  if (numCells % 2 != 0)
    return console.log("This function takes only even num");

  // This is to assure there's a pair to every sound
  const halfRandomSounds = getRandomElements(soundsData, numCells / 2);
  const fullRandomSounds = [...halfRandomSounds, ...halfRandomSounds];
  const shuffledRandomSounds = shuffleArray(fullRandomSounds);

  const randomCells = Array(numCells)
    .fill({ selected: false, guessed: false })
    .map((cell, id) => ({
      ...cell,
      sound: shuffledRandomSounds[id],
    }));

  console.log("created new cells", randomCells);

  return randomCells;
};

export default createRandomCells;
