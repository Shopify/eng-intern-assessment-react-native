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
export const formatTime = (milliseconds: number, multiplier: number = 1) => {
  if (milliseconds < 0) {
    return {
      formattedHours: '00',
      formattedMins: '00',
      formattedSecs: '00',
      formattedMilliseconds: '00'
    };
  }
  // Adjust the milliseconds by multiplying in order to account for performance
  const adjustedMilliseconds = milliseconds * multiplier;

  const hours = Math.floor(adjustedMilliseconds / 3600000);
  const minutes = Math.floor((adjustedMilliseconds % 3600000) / 60000);
  const seconds = Math.floor((adjustedMilliseconds % 60000) / 1000);
  const ms = adjustedMilliseconds % 1000;

  return {
    formattedHours: hours.toString().padStart(2, '0').slice(0, 2),
    formattedMins: minutes.toString().padStart(2, '0').slice(0, 2),
    formattedSecs: seconds.toString().padStart(2, '0').slice(0, 2),
    formattedMilliseconds: ms.toString().slice(-2).padStart(2, '0')
  };
};