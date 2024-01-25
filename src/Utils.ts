export const formatTime = (time: number): string => {
    const minutes = Math.floor(time / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    // Pad single-digit seconds and milliseconds with leading zeros
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    const formattedMilliseconds = milliseconds < 10 ? `0${milliseconds}` : `${milliseconds}`;

    return `${minutes}:${formattedSeconds}.${formattedMilliseconds}`;
};
