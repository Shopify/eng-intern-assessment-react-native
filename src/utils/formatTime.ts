// Function to format the time into minutes, seconds, and centiseconds
export const formatTime = (time: number) => {
    const centiseconds = Math.floor(time / 10) % 100;
    const minutes_and_seconds = String(Math.floor(time / 60000)).padStart(2, '0') 
    + ":" + String(Math.floor(time / 1000) % 60).padStart(2, '0') + ":";

    // Convert each time component to an array of single digits
    const centisecondsArray = String(centiseconds).padStart(2, '0').split('');

    return { minutes_and_seconds, centisecondsArray };
  };

// Function to format lap times
export const formatLapTime = (time: number) => {
    const milliseconds = Math.floor(time) % 1000;
    const seconds = Math.floor(time / 1000) % 60;
    const minutes = Math.floor(time / 60000);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(3, '0')}`;
  };