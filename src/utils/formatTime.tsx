//Function which formats the time from milliseconds to HH:MM:SS.(mls)
export function formatTime(millis: number): string {
    const hours = Math.floor((millis/1000)/3600);
    const minutes = Math.floor(((millis/1000) - (hours*3600))/60);
    const seconds = Math.floor((millis/1000)%60);
    const millisFormatted = millis%1000;
  
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${millisFormatted.toString().padStart(3, "0")}`;
}