/**
 * This function takes a number in milliseconds and formats it into a readable string of HH:MM:SS.
 * 
 * @param input - number value in milliseconds
 * @returns String value in the format of HH:MM:SS
 */

export const formatTime = (time: number): string => {
    // Constants for time conversion
    const MS_PER_SECOND = 1000;
    const SECONDS_PER_MINUTE = 60;
    const MINUTES_PER_HOUR = 60;
  
    // Helper function to format time component
    const formatComponent = (component: number): string => component < 10 ? `0${component}` : `${component}`;
  
    const seconds = Math.floor(time / MS_PER_SECOND) % SECONDS_PER_MINUTE;
    const minutes = Math.floor(time / (MS_PER_SECOND * SECONDS_PER_MINUTE)) % MINUTES_PER_HOUR;
    const hours = Math.floor(time / (MS_PER_SECOND * SECONDS_PER_MINUTE * MINUTES_PER_HOUR));
  
    return `${formatComponent(hours)}:${formatComponent(minutes)}:${formatComponent(seconds)}`;
  };
  