import { useState, useEffect } from 'react';
import { formatTime } from '../utils/formatTime';

export const useStopwatch = () => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [lapTimes, setLapTimes] = useState<string[]>([]); // Changed to lapTimes for clarity
  const [lastLapTime, setLastLapTime] = useState<number>(0); // New state for the last lap time
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isRunning && startTime !== null) {
      interval = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 10);
    }

    return () => {
      if (interval !== null) clearInterval(interval);
    };
  }, [isRunning, startTime]);

  const start = () => {
    setStartTime(Date.now() - time);
    setIsRunning(true);
    if (time === 0) {
      setLastLapTime(0); // Reset last lap time when starting from 0
    }
  };

  const stop = () => {
    setIsRunning(false);
  };

  const reset = () => {
    setIsRunning(false);
    setTime(0);
    setLapTimes([]);
    setStartTime(null);
    setLastLapTime(0);
  };

  const lap = () => {
    if (time > 0) {
        const lapTime = time - lastLapTime;
        setLapTimes(prevLaps => [...prevLaps, formatTime(lapTime)]);
        setLastLapTime(time);
    }
  }

  return { time, start, stop, reset, lap, lapTimes, isRunning };
};
