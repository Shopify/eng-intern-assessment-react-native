/**
  Converts a time duration in milliseconds to a formatted string in the format MM:SS:CC.
  @param milliseconds - The time duration in milliseconds.
  @returns A formatted string representing the time duration (e.g.: 02:23:56).
*/
export const formatTime = (milliseconds: number): string => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const centiseconds = Math.floor((milliseconds % 1000) / 10);

  // Returns a formatted string using template literals. It ensures that 
  // each component (minutes, seconds, and centiseconds) is represented with
  // two digits, adding leading zeros if necessary, using the padStart method.
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(centiseconds).padStart(2, '0')}`;
};