export const formatNumber = (num: number): string => num.toString().padStart(2, '0');

export const formatTime = (time: number): string => {
  const milliseconds = Math.floor((time % 1000) / 10);
  const seconds = Math.floor((time / 1000) % 60);
  const minutes = Math.floor((time / (1000 * 60)) % 60);

  return `${formatNumber(minutes)}:${formatNumber(seconds)}.${formatNumber(milliseconds)}`;
};
