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
  const [displayedTime, setDisplayedTime] = useState<number>(0); // Additional state for displayed time

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    let displayInterval: ReturnType<typeof setInterval> | null = null;

    if (isRunning && startTime !== null) {
      // Interval for internal timer, updates more frequently
      interval = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 10); // 10 ms for high precision

      // Interval for displayed timer, updates less frequently
      displayInterval = setInterval(() => {
        setDisplayedTime(Date.now() - startTime);
      }, 100); // 100 ms for fewer rerenders
    }

    return () => {
      if (interval !== null) clearInterval(interval);
      if (displayInterval !== null) clearInterval(displayInterval);
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
    setDisplayedTime(0);
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

  return { time: displayedTime, start, stop, pause, reset, lap, lapTimes, isRunning, showTime, hasStarted };
};
