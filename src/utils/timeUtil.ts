/**
 * Format seconds into the MM:SS:.ss or HH:MM:SS.ss format
 * 
 * @param {number} time - Number of Milliseconds
 * @returns {string} Formatted time string
 */
export function formatTime(time: number): string {
    const milliseconds = Math.floor((time % 1000)/10);
    const seconds = Math.floor(time / 1000);
    const minutes = Math.floor(seconds / 60);

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
}