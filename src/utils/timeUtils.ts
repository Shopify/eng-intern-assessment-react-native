export default function calculateTimer(totalTime: number): string {
  const totalMilliseconds = Math.floor(totalTime * 4);
  const hours: number = Math.floor(totalMilliseconds / (3600 * 1000));
  const minutes: number = Math.floor(
    (totalMilliseconds % (3600 * 1000)) / (60 * 1000)
  );
  const seconds: number = Math.floor((totalMilliseconds % (60 * 1000)) / 1000);
  const milliseconds: number = Math.floor(totalMilliseconds % 100);

  const formatHours = hours < 10 ? `0${hours}` : hours;
  const formatMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formatSeconds = seconds < 10 ? `0${seconds}` : seconds;
  const formatMilliseconds =
    milliseconds < 10 ? `0${milliseconds}` : milliseconds;

  return `${formatHours}:${formatMinutes}:${formatSeconds}:${formatMilliseconds}`;
}
