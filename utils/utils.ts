/**
 * Converts time in seconds to a formatted string.
 * Format: HH:MM:SS, where HH is hours, MM is minutes, and SS is seconds.
 *
 * @param {number} seconds - The time in seconds to format.
 * @return {string} The formatted time string.
 */
export function formatTime(seconds: number) {
  // Calculating hours, minutes, and remaining seconds
  const hours = Math.floor(seconds / 3600); // 3600 seconds in an hour
  const minutes = Math.floor((seconds % 3600) / 60); // 60 seconds in a minute
  const remainingSeconds = seconds % 60;

  // Formatting each component to ensure two-digit representation
  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = remainingSeconds.toString().padStart(2, "0");

  // Constructing the final formatted time string
  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}
