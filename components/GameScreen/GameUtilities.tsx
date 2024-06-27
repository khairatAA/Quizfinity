export const getInitialTime = (difficulty: string): number => {
  switch (difficulty) {
    case "easy":
      return 6 * 60; // 6 minutes
    case "medium":
      return 5 * 60; // 5 minutes
    case "hard":
      return 3 * 60; // 3 minutes
    default:
      return 6 * 60; // Default to easy difficulty
  }
};

export function shuffleArray(array: Array<any>) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes < 10 ? "0" : ""}${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;
};
