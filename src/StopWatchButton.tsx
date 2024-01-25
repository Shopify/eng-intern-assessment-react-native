import React, { useState } from "react";
import { View } from "react-native";

type Props = {
  currentTime: number;
  setTime: Function;
};

export default function StopWatchButton(props: Props) {
  const { setTime, currentTime } = props;
  const [intervalId, setIntervalId] = useState<number>(0);
  const [lapData] = useState<Object[]>([]);

  const handleStart = () => {
    let interval: any = setInterval(() => {
      setTime((prev: number) => prev + 1);
    }, 1);

    setIntervalId(interval);
  };

  const handleStop = () => {
    clearInterval(intervalId);
  };

  const handleReset = () => {
    clearInterval(intervalId);
    setTime(0);
  };

  const handleLap = (currentTime: number) => {
    lapData.push({
      lapTime: lapData.length,
      currentLapTime: currentTime,
    });
  };

  return (
    <View>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={handleReset}>Reset</button>
      <button onClick={handleLap(currentTime)}>Lap</button>
    </View>
  );
}
