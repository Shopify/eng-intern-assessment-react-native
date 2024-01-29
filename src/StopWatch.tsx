import React, { useState, useRef } from "react";
import { View, Text } from "react-native";
import StopWatchButton from "./StopWatchButton";

interface StopwatchProps {}

const Stopwatch: React.FC<StopwatchProps> = () => {
  const [time, setTime] = useState<number>(0);
  const [running, setRunning] = useState<boolean>(false);
  const [laps, setLaps] = useState<number[]>([]);
  const intervalIdRef = useRef<number | null>(null);

  const formatTime = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    const formattedMilliseconds = String(
      Math.floor((milliseconds % 1000) / 10)
    ).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
  };

  const startStopwatch = () => {
    if (!running) {
      setRunning(true);
      const startTime = Date.now() - time;
      intervalIdRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 90);
    } else {
      setRunning(false);
      clearInterval(intervalIdRef.current!);
      intervalIdRef.current = null;
    }
  };

  const resetStopwatch = () => {
    setRunning(false);
    clearInterval(intervalIdRef.current!);
    intervalIdRef.current = null;
    setTime(0);
    setLaps([]);
  };

  const recordLap = () => {
    setLaps((prevLaps) => [...prevLaps, time]);
  };

  return (
    <View>
    </View>
  );
};

export default Stopwatch;
