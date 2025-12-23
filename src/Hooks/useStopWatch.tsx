import { useState, useRef, useEffect } from "react";

interface UseStopWatch {
  isRunning: boolean;
  time: number;
  laps: number[];
  toggleTimer: () => void;
  resetTimer: () => void;
  addLap: () => void;
  formatTime: (seconds: number) => string;
}

export const useStopWatch = (): UseStopWatch => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const [laps, setLaps] = useState<number[]>([]);
  const lapTimeRef = useRef<number>(0);

  useEffect(() => {
    let interval: any

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
        lapTimeRef.current += 1;
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  const toggleTimer = (): void => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  const resetTimer = (): void => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
    lapTimeRef.current = 0;
  };

  const addLap = (): void => {
    setLaps((prevLaps) => [...prevLaps, lapTimeRef.current]);
    lapTimeRef.current = 0;
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  return {
    toggleTimer,
    resetTimer,
    addLap,
    formatTime,
    isRunning,
    time,
    laps,
  };
};
