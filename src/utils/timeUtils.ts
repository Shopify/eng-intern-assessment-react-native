export default function calculateTimer(totalTime: number): string {
  // time display conversion
  const minutes: number = Math.floor(totalTime / 3600) % 100;
  const seconds: number = Math.floor(totalTime / 100) % 60;
  const milliseconds: number = Math.floor(totalTime % 100);

  // time formatting
  const formatMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formatSeconds = seconds < 10 ? `0${seconds}` : seconds;
  const formatMilliseconds =
    milliseconds < 10 ? `0${milliseconds}` : milliseconds;

  return `${formatMinutes}:${formatSeconds}:${formatMilliseconds}`;
}
