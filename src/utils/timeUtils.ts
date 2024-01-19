/**
 * @author Marcin Koziel
 * @date 01/19/2024
 */

/**
 * Formats a duration given in milliseconds into hours, minutes, seconds, and milliseconds.
 *
 * @param milliseconds The duration in milliseconds to format. It should be a non-negative number.
 * @returns An object containing the formatted time components: hours, minutes, seconds,
 *          and milliseconds. Each component is a string padded with leading zeros if needed.
 */
export const formatTime = (milliseconds: number) => {
  const hours = Math.floor(milliseconds / 3600000 % 24);
  const minutes = Math.floor((milliseconds - hours * 3600000) / 60000);
  const seconds = Math.floor((milliseconds - hours * 3600000 - minutes * 60000) / 100);
  const ms = milliseconds % 100;
  return {
    formattedHours: hours.toString().padStart(2, '0'),
    formattedMins: minutes.toString().padStart(2, '0'),
    formattedSecs: seconds.toString().padStart(2, '0'),
    formattedMilliseconds: ms.toString().padStart(2, '0'),
  };
};