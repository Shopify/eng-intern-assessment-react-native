import React, { useState } from "react";
import { View } from "react-native";

type Props = {
  setTime: Function;
};

export default function StopWatchButton(props: Props) {
  const { setTime } = props;
  const [intervalId, setIntervalId] = useState<number>(0);

  const handleStart = () => {
    let interval: any = setInterval(() => {
      setTime((prev: number) => prev + 1);
    }, 1000);

    setIntervalId(interval);
  };

  const handleStop = () => {
    clearInterval(intervalId);
  };

  const handleReset = () => {
    clearInterval(intervalId);
    setTime(0);
  };

  return (
    <View>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={handleReset}>Reset</button>
    </View>
  );
}
