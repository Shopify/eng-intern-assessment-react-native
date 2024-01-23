import { useState, useEffect } from 'react';
import { formatTime } from '../utils/formatTime';

export const useStopwatch = () => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [showTime, setShowTime] = useState<boolean>(true);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [lapTimes, setLapTimes] = useState<string[]>([]);
  const [lastLapTime, setLastLapTime] = useState<number>(0);
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
    setShowTime(true);
    setHasStarted(true);
    setStartTime(Date.now() - time);
    setIsRunning(true);
    if (time === 0) {
      setLastLapTime(0);
    }
  };

  const stop = () => {
    setIsRunning(false);
    setShowTime(false);
  };

  const pause = () => {
    setIsRunning(false);
  };

  const reset = () => {
    setIsRunning(false);
    setTime(0);
    setLapTimes([]);
    setStartTime(null);
    setLastLapTime(0);
    setShowTime(true);
    setHasStarted(false);
  };

  const lap = () => {
    if (time > 0) {
        const lapTime = time - lastLapTime;
        setLapTimes(prevLaps => [...prevLaps, formatTime(lapTime)]);
        setLastLapTime(time);
    }
  }

  return { time, start, stop, pause, reset, lap, lapTimes, isRunning, showTime, hasStarted };
};
