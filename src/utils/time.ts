/**
 * Formats a number of seconds to be displayed for the stopwatch.
 * @param milliseconds The number of milliseconds to be formatted and displayed
 * @returns A formatted time as a string with minutes, seconds, and milliseconds
 */
export const formatTime = (milliseconds: number) => {
    // 6000 milliseconds in 1 minute
    const minutes = Math.floor(milliseconds / 6000);
    // Get remainder after minutes, 100 milliseconds in 1 second
    const seconds = Math.floor((milliseconds % 6000) / 100);
    // Leftover will be the remaining milliseconds
    const remainingMilliseconds = milliseconds % 100;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
        2,
        "0"
    )}:${String(remainingMilliseconds).padStart(2, "0").slice(0, 2)}`;
};

/**
 * Returns the worst time (ie the highest time)
 * @param times list of times in milliseconds
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
 * @param times list of times in milliseconds
 * @returns the best time
 */
export const getBestTime = (times: number[]): number | undefined => {
    if (times.length < 1) {
        return;
    }
    return Math.min(...times);
};

/**
 * Returns the average time for a list of times.
 * @param times list of times in milliseconds
 * @returns the average time
 */
export const getAverageTime = (times: number[]): number | undefined => {
    if (times.length < 1) {
        return;
    }
    // Calculate the sum of all numbers in the array
    const sum = times.reduce((acc, num) => acc + num, 0);

    // Calculate the average
    const average = sum / times.length;

    return average;
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
