import React, { useState, useRef } from "react";
import { View, Text } from "react-native";
import StopWatchButton from "./StopWatchButton";

interface StopwatchProps {}

const Stopwatch: React.FC<StopwatchProps> = () => {
  const [time, setTime] = useState<number>(0);
  const [running, setRunning] = useState<boolean>(false);
  const [laps, setLaps] = useState<number[]>([]);
  const intervalIdRef = useRef<number | null>(null);

  return (
    <View>
    </View>
  );
};

export default Stopwatch;
