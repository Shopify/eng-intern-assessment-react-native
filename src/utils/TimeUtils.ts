export const formatTime = (time: number) => {
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time - hours * 3600000) / 60000);
  const seconds = Math.floor((time - hours * 3600000 - minutes * 60000) / 1000);

  const hoursString = hours.toString().padStart(2, "0");
  const minutesString = minutes.toString().padStart(2, "0");
  const secondsString = seconds.toString().padStart(2, "0");

  return `${hoursString}:${minutesString}:${secondsString}`;
};
