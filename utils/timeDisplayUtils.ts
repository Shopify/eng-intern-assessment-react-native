    // converts seconds into a string formatted by HH:MM:SS
    export function formatDisplayTimeFromSeconds(timeInSeconds: number): string {
        const hours = Math.floor(timeInSeconds / 3600);
        const remainingSeconds = timeInSeconds % 3600;
        const minutes = Math.floor(remainingSeconds / 60);
        const seconds = remainingSeconds % 60;
        const formattedDisplayTime = `${padWithZero(hours)}:${padWithZero(minutes)}:${padWithZero(seconds)}`;
        return formattedDisplayTime;
    }
  
    function padWithZero(num: number): string {
        return num.toString().padStart(2, '0');
    }