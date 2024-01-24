export function convertMillisToClockTime(milliseconds: number) {
    const minutes = Math.floor(milliseconds / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    const remainingMilliseconds = milliseconds % 1000;

    return {
        minutes: minutes,
        seconds: seconds,
        milliseconds: remainingMilliseconds
    };
}