import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Stopwatch from "./src/StopWatch";
import StopwatchButton from "./src/StopWatchButton";
import { StatusBar } from "expo-status-bar";
import { formatTime } from "./src/StopWatch";

// App.tsx should manage the state and logic of the overall app. 

export default function App() {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(0);
  const [laps, setLaps] = useState<string[]>([]);

  // Define a function to increment the previous time by 1.
  const incrementTimer = () => {
    setTimer((prevTimer) => prevTimer + 1);
  };

  // Utilize the useEffect hook to accomplish side effects (updating time) of this function component
  useEffect(() => {
    let interval: number | null = null;

    if (isRunning) {
      interval = setInterval(incrementTimer, 1000);
    }

    // Cleanup function so we don't utilize unncessary resources even after the component is unmounted
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleLap = () => {
    if (isRunning) {
      setLaps([...laps, formatTime(timer)]);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimer(0);
    setLaps([]);
  };

  return (
    <View style={styles.container}>
      <Stopwatch time={timer} />
      <StopwatchButton
        onStartStop={handleStartStop}
        onLap={handleLap}
        onReset={handleReset}
        isRunning={isRunning}
      />
      {laps.map((lap, index) => (
        <Text key={index}>
          Lap {index + 1}: {lap} seconds
        </Text>
      ))}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
