// src/utils/formatTime.ts
export function formatTime(time: number): string {
    const milliseconds = `00${time % 1000}`.slice(-2);
    const seconds = `0${Math.floor((time / 1000) % 60)}`.slice(-2);
    const minutes = `0${Math.floor((time / 60000) % 60)}`.slice(-2);
    return `${minutes}:${seconds}:${milliseconds}`;
}  