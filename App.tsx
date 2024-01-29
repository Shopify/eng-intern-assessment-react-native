import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Stopwatch from "./src/StopWatch";
import StopwatchButton from "./src/StopWatchButton";
import { StatusBar } from "expo-status-bar";
import { formatTime } from "./src/StopWatch";
import { Image, ScrollView } from "react-native";

/**
 * App is the main component for a stopwatch application. It manages the state and logic and
 * renders the overall layout of the app including the stopwatch display, list of buttons,
 * and list of lap times.
 *
 * State:
 * - isRunning: A boolean indicating whether the stopwatch is currently running.
 * - timer: The current time of the stopwatch in seconds.
 * - laps: An array of recorded lap times in string format.
 *
 * This component uses a `useState` hook for managing the stopwatch's running state,
 * the timer, and the recorded laps. It also employs the `useEffect` hook to update
 * the timer every second when the stopwatch is running. The component's layout consists
 * of an icon at the top (shopify-icon), followed by the stopwatch display, control buttons, and a
 * scrollable view of recorded lap times.
 *
 * Functions:
 * - incrementTimer: Increments the timer by one second.
 * - handleStartStop: Toggles the running state of the stopwatch.
 * - handleLap: Records the current time as a lap when the stopwatch is running.
 * - handleReset: Resets the stopwatch and clears recorded laps.
 */

export default function App() {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(0);
  const [laps, setLaps] = useState<string[]>([]);
  const icon = require("./assets/shopify-icon.png");

  // Helper fnction to increment the previous time by 1
  const incrementTimer = () => {
    setTimer((prevTimer) => prevTimer + 1);
  };

  // Utilize the useEffect hook to accomplish side effects (updating time) of this function component
  useEffect(() => {
    let interval: number | null = null;

    if (isRunning) {
      interval = setInterval(incrementTimer, 1000);
    }

    // Cleanup function to avoid utilizing unncessary resources even after the component is unmounted
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
      <View style={styles.content}>
        <Image source={icon} style={styles.icon} />
        <Stopwatch time={timer} />
        <StopwatchButton
          onStartStop={handleStartStop}
          onLap={handleLap}
          onReset={handleReset}
          isRunning={isRunning}
        />
      </View>

      {laps.length > 0 ? (
        <View style={styles.lapListContainer}>
          <ScrollView testID="lap-list" style={styles.lapList}>
            {laps.map((lap, index) => (
              <Text key={index} style={styles.lapText}>
                Lap {index + 1}: {lap}
              </Text>
            ))}
          </ScrollView>
        </View>
      ) : null}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: "black",
  },
  content: {
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  lapListContainer: {
    flex: 1, // 1/3 of the space used by the topmost parent
    width: "100%", // The lap list container will take the full width
  },
  lapList: {
    paddingHorizontal: 40,
    width: "100%",
  },
  lapText: {
    color: "white",
    fontSize: 22,
    textAlign: "center",
    fontWeight: "bold",
    borderBottomWidth: 1, // Add a line to separate lap times
    borderBottomColor: "lightgrey",
    paddingVertical: 10, // Padding around lap times
    width: "100%",
  },

  icon: {
    width: 150,
    height: 173,
    marginBottom: 20,
  },
});
