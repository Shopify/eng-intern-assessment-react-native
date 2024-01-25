
/**
 * Converts milliseconds to an object representing clock time.
 * 
 * @param {number} milliseconds - The input time in milliseconds.
 * @returns {{ minutes: number, seconds: number, milliseconds: number }} - An object representing clock time.
 */
function convertMillisToClockTime(milliseconds: number) {
    const minutes = Math.floor(milliseconds / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    const remainingMilliseconds = milliseconds % 1000;

    return {
        minutes: minutes,
        seconds: seconds,
        milliseconds: remainingMilliseconds
    };
}

/**
 * Formats a given time value to ensure it has at least two digits.
 * 
 * @param {number} time - The input time value.
 * @returns {string} - The formatted time string.
 */
const formatTime = (time: number) => {
    return String(time).padStart(2, "0");
};

/**
 * Converts milliseconds to a formatted clock time string.
 * 
 * @param {number} milliseconds - The input time in milliseconds.
 * @returns {string} - The formatted clock time string in the format "MM:SS:SS".
 */
export function convertMillisToClockTimeString(milliseconds: number) {
    return `${formatTime(convertMillisToClockTime(milliseconds).minutes)}:${formatTime(convertMillisToClockTime(milliseconds).seconds)}:${formatTime(convertMillisToClockTime(milliseconds).milliseconds / 10)}`
}