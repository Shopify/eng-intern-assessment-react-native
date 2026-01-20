// Convert time in seconds (timeInSec) to a formatted time string (HH:MM:SS)
export function formatTimeStr (timeInSec: number): string {
    // calculate HH:MM:SS given 'time' in seconds
    // Hours calculation
    const hours = Math.floor(timeInSec / 3600);
    const hoursStr = hours.toString().padStart(2, '0');

    // Minutes calculation
    const minutes = Math.floor((timeInSec % 3600) / 60);
    const minutesStr = minutes.toString().padStart(2, '0');

    // Seconds calculation
    const seconds = Math.floor(timeInSec % 60);
    const secondsStr = seconds.toString().padStart(2, '0');

    const formattedTime = `${hoursStr}:${minutesStr}:${secondsStr}`;
    return formattedTime;
}