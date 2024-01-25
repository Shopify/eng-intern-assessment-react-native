/**
 * Formats a number of seconds to be displayed for the stopwatch.
 * @param seconds The number of seconds to be formatted and displayed
 * @returns A formatted time as a string with hours, minutes, and seconds
 */
export const formatTime = (seconds: number) => {
    // 3600 seconds in hour
    const hours = Math.floor(seconds / 3600);
    // Get remainder after hour get, 60 seconds in 1 min
    const minutes = Math.floor((seconds % 3600) / 60);
    // Leftover will be the remaining seconds
    const remainingSeconds = seconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
        2,
        "0"
    )}:${String(remainingSeconds).padStart(2, "0")}`;
};

/**
 * Returns the worst time (ie the highest time)
 * @param times list of times in seconds
 * @returns the  worst time
 */
export const getWorstTime = (times: number[]): number | undefined => {
    if (times.length < 1) {
        return;
    }
    return Math.max(...times);
};

/**
 * Returns the best time (ie the lowest time)
 * @param times list of times in seconds
 * @returns the best time
 */
export const getBestTime = (times: number[]): number | undefined => {
    if (times.length < 1) {
        return;
    }
    return Math.min(...times);
};

/**
 * Maps laps objects to an array of number of their corresponding times
 * @param laps List of lap objects
 * @returns List of times as numbers
 */
export const mapLapsToTimes = (
    laps: { time: number; index: number }[]
): number[] => {
    if (laps.length < 1) {
        return [];
    }
    const times = laps.map((lap) => lap.time);
    return times;
};
