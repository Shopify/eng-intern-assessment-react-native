/**
 * Converts time in milliseconds to a formatted string.
 * Format: HH:MM:SS.mm, where HH is hours, MM is minutes, SS is seconds, and mm is milliseconds.
 *
 * @param {number} milliseconds - The time in milliseconds to format.
 * @return {string} The formatted time string.
 */
export function formatTime(milliseconds: number) {
  // Calculating hours, minutes, seconds, and milliseconds
  const hours = Math.floor(milliseconds / 3600000);
  const minutes = Math.floor((milliseconds % 3600000) / 60000);
  const seconds = Math.floor((milliseconds % 60000) / 1000);
  const remainingMilliseconds = Math.floor((milliseconds % 1000) / 10);

  // Formatting each component to ensure two-digit representation
  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");
  const formattedMilliseconds = remainingMilliseconds
    .toString()
    .padStart(2, "0");

  // Constructing the final formatted time string
  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
}
