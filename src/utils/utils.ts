/*
 * Converts time in milliseconds to a string in the format of hours:mins:secs
 */
export const formatTime = (milliseconds: number): string => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(
    seconds
  )}`;
};

/*
 * Formats the time with leading zeros
 */
const formatNumber = (time: number): string => {
  return time.toString().padStart(2, "0");
};
