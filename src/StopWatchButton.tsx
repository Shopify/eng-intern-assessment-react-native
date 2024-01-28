import { View, Button, Text } from "react-native";
import React, { useState } from "react";

type Props = {
  setTimeInSeconds: Function;
};

export default function StopWatchButton(props: Props) {
  const { setTimeInSeconds } = props;
  const [intervalId, setIntervalId] = useState<number>(0);

  const handlePlayButton = () => {
    const interval: any = setInterval(() => {
      setTimeInSeconds((previousState: number) => previousState + 1);
    }, 1000);

    setIntervalId(interval);
  };

  const handleStopButton = () => {
    clearInterval(intervalId);
  };

  const handleResetButton = () => {
    clearInterval(intervalId);
    setTimeInSeconds(0);
  };

  return (
    <View>
      <button onClick={handlePlayButton}>Play</button>
      <button onClick={handleStopButton}>Stop</button>
      <button onClick={handleResetButton}>Reset</button>
    </View>
  );
}
