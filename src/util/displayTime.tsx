export function displayTime(elapsedTime: number): string {
  // Calculations (elapsedTime is in seconds)
  // Hours
  const hours = Math.floor(elapsedTime / 3600);
  // Minutes
  const minutes = Math.floor((elapsedTime % 3600) / 60);
  // Seconds
  const seconds = Math.floor(elapsedTime % 60);
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}
