/**
 * Format seconds into the HH:MM:SS format
 * 
 * @param {number} time - Number of Seconds
 * @returns {string} Formatted time string
 */
export function formatTime(time: number): string {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return [hours, minutes, seconds]
        .map(val => val < 10 ? `0${val}` : val)
        .join(':');;
}