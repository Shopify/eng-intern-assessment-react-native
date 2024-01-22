import { useState, useEffect } from 'react';
import { formatTime } from '../utils/formatTime';

export const useStopwatch = () => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [lapCount, setLaps] = useState<string[]>([]);
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isRunning && startTime !== null) {
      interval = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 10); // Consider using a larger interval for better performance
    }

    return () => {
      if (interval !== null) clearInterval(interval);
    };
  }, [isRunning, startTime]);

  const start = () => {
    setStartTime(Date.now() - time);
    setIsRunning(true);
  };

  const stop = () => {
    setIsRunning(false);
  };

  const reset = () => {
    setIsRunning(false);
    setTime(0);
    setStartTime(null);
  };

  const lap = () => {
    setLaps(prevLaps => [...prevLaps, formatTime(time)]);
  }

  return { time, start, stop, reset, lap, lapCount, isRunning };
};