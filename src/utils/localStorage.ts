const getLocalStorageNumCells = (): number => {
  const localStorageNumCells = window.localStorage.getItem("numCells");

  if (localStorageNumCells) {
    return parseInt(localStorageNumCells);
  }

  return 9;
};

export default getLocalStorageNumCells;
