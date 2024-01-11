const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const mins = Math.floor((seconds % 3600) / 60);
    const hrs = Math.floor(seconds / 3600);
    const secondsRemaining = seconds % 60;

    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secondsRemaining).padStart(2, '0')}`;
}

export {formatTime}