/**
 * Formats a total number of seconds into a time string (HH:MM:SS).
 *
 * @param {number} totalSeconds - The total number of seconds.
 * @returns {string} Formatted time string.
 */
export function formatTime(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}
