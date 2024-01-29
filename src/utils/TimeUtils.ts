export const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time - minutes * 60000) / 1000);
  const miliseconds = Math.floor(time % 1000);

  const minutesString = minutes.toString().padStart(2, "0");
  const secondsString = seconds.toString().padStart(2, "0");
  const milisecondsString = miliseconds.toString().padStart(3, "0");

  return `${minutesString}:${secondsString}:${milisecondsString}`;
};
