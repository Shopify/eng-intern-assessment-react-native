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

const formatTime = (time: number) => {
    return String(time).padStart(2, "0");
};

export function convertMillisToClockTimeString(milliseconds: number) {
    return `${formatTime(convertMillisToClockTime(milliseconds).minutes)}:${formatTime(convertMillisToClockTime(milliseconds).seconds)}:${formatTime(convertMillisToClockTime(milliseconds).milliseconds / 10)}`
}