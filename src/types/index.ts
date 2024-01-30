/**
 * @author Marcin Koziel
 * @date 01/19/2024
 */

interface Lap {
  lapNumber: number;
  lapTime: {
    formattedHours: string;
    formattedMins: string;
    formattedSecs: string;
    formattedMilliseconds: string;
  };
  millisecondsElapsedCurrentLap: number;
}

interface StopWatchButtonProps {
  onStartStop: () => void;
  onLapReset: () => void;
  isRunning: boolean;
}

interface FormattedTime {
  formattedHours: string;
  formattedMins: string;
  formattedSecs: string;
  formattedMilliseconds: string;
}