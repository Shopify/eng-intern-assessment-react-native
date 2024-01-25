/**
 * Formats a number to two digits.
 *
 * @param {number} num The input number
 * @return {string} The formatted number with two digits.
 */
export const formatNumber = (num: number): string =>
  num.toString().padStart(2, "0");

/**
 * Formats a time value (in milliseconds) into a string format (minutes:seconds:milliseconds).
 *
 * This function converts a time into a formatted string representing
 * minutes, seconds, and milliseconds. Each component is two digits.
 *
 * @param {number} time The time in milliseconds.
 * @return {string} The time formatted as a string in "MM:SS:ms".
 */
export const formatTime = (time: number): string => {
  // Extracting minutes, seconds, and milliseconds
  const milliseconds = Math.floor((time % 1000) / 10);
  const seconds = Math.floor((time / 1000) % 60);
  const minutes = Math.floor((time / (1000 * 60)) % 60);

  return `${formatNumber(minutes)}:${formatNumber(seconds)}:${formatNumber(
    milliseconds
  )}`;
};
