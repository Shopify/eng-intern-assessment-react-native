const displayTime = (time: number): string => {
    const milliseconds = (Math.floor((time * 100)%100)).toString().padStart(2, '0');
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
}

export default displayTime;