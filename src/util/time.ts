export const formatTime = (time: number) => {
  const format = (x: number) => String(Math.floor(x)).padStart(2, "0");
  return `${format(time / 3600)}:${format((time / 60) % 60)}:${format(time % 60)}`;
};
