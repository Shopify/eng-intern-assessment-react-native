import { useEffect, useMemo, useRef, useState } from "react";

export interface Stopwatch {
  milliseconds: number;
  laps: number[];
  minLapTime: number | null;
  maxLapTime: number | null;
  isPaused: boolean;
  resume: () => void;
  pause: () => void;
  reset: () => void;
  lap: () => void;
}

export function useStopwatch(): Stopwatch {
  const [milliseconds, setMilliseconds] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const [laps, setLaps] = useState<number[]>([]);

  const lastTime = useRef(Date.now());
  const accumulatedTime = useRef(0);

  const minLapTime = useRef<number | null>(null);
  const maxLapTime = useRef<number | null>(null);

  // just so we don't recompute this each time for no reason
  const totalLaps = useMemo(
    () => laps.reduce((total, lap) => total + lap, 0),
    [laps],
  );

  function updateMinAndMaxLapTimes(newLap: number) {
    if (minLapTime.current === null || newLap < minLapTime.current) {
      minLapTime.current = newLap;
    }
    if (maxLapTime.current === null || newLap > maxLapTime.current) {
      maxLapTime.current = newLap;
    }
  }

  function resume() {
    if (!isPaused) return;
    setIsPaused(false);
    lastTime.current = Date.now();
  }

  function pause() {
    if (isPaused) return;
    setIsPaused(true);
    const currentTime = Date.now();
    accumulatedTime.current += currentTime - lastTime.current;
    lastTime.current = currentTime;
  }

  function reset() {
    setIsPaused(true);
    lastTime.current = Date.now();
    setMilliseconds(0);
    setLaps([]);
    minLapTime.current = null;
    maxLapTime.current = null;
    accumulatedTime.current = 0;
  }

  function lap() {
    const lapTime = milliseconds - totalLaps;
    setLaps((laps) => {
      updateMinAndMaxLapTimes(lapTime);
      return [...laps, lapTime];
    });
  }

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      const currentTime = Date.now();
      const timePassed = currentTime - lastTime.current;
      setMilliseconds(timePassed+accumulatedTime.current);
    }, 10);

    return () => clearInterval(interval);
  }, [isPaused]);

  return {
    milliseconds,
    laps,
    isPaused,
    minLapTime: minLapTime.current,
    maxLapTime: maxLapTime.current,
    resume,
    pause,
    reset,
    lap,
  };
}
