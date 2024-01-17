import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import StopWatch from "./src/StopWatch";
import StopWatchButton from "./src/StopWatchButton";
import { useEffect, useState } from "react";

// pale red: #330e0c
// bright red: #ff453a
// pale green: #0a2a12
// bright green: #30d158
// gray on: #1b1b1b
// gray off: #1c1c1e

export default function App() {
  // Define state variables for managing the stopwatch.
  const [isActive, setIsActive] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const [formattedTime, setFormattedTime] = useState<string>("00:00:00");
  const [laps, setLaps] = useState<string[]>([]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;

    // Start the interval when the stopwatch is active.
    if (isActive) {
      interval = setInterval(() => {
        setTime((time) => time + 1);
        formatTime();
      }, 1000);
    } else if (!isActive && time !== 0) {
      if (interval) clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, time]);

  const toggleTimer = () => {
    // Start/stop timer depending on if stopwatch is active.
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    // Reset the stopwatch to it's initial state.
    setTime(0);
    setFormattedTime("00:00:00");
    setLaps([]);
  };

  const handleLap = () => {
    // Update laps by append new lap to list of laps.
    setLaps([formattedTime, ...laps]); // Laps are ordered newest to oldest.
  };

  const formatTime = (): void => {
    // Format the time in HH:MM:SS format.
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    setFormattedTime(
      [hours, minutes, seconds]
        .map((val) => String(val).padStart(2, "0"))
        .join(":")
    );
  };

  return (
    <View style={styles.container}>
      {/* Props passed down to child elements to be used between sibling elements */}
      <StopWatch time={formattedTime} />
      <StopWatchButton
        onToggle={toggleTimer}
        onReset={resetTimer}
        onLap={handleLap}
        isActive={isActive}
        laps={laps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "black",
  },
});
