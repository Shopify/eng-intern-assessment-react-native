export default function calculateTimer(totalTime: number): string {
  const minutes: number = Math.floor(totalTime / 3600) % 100;
  const seconds: number = Math.floor(totalTime / 100) % 60;
  const milliseconds: number = Math.floor(totalTime % 100);

  const formatMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formatSeconds = seconds < 10 ? `0${seconds}` : seconds;
  const formatMilliseconds =
    milliseconds < 10 ? `0${milliseconds}` : milliseconds;

  return `${formatMinutes}:${formatSeconds}:${formatMilliseconds}`;
}
