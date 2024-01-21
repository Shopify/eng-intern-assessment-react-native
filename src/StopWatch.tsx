import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import StopWatchButton from "./StopWatchButton";
import { formatTime } from "../utils/utils";

export default function StopWatch() {
  // State declarations
  const [startTime, setStartTime] = useState<number | null>(null); // Start time of the stopwatch
  const [pausedTime, setPausedTime] = useState<number>(0); // Accumulated paused time
  const [timerCount, setTimerCount] = useState<number>(0); // Elapsed time in milliseconds
  const [isRunning, setIsRunning] = useState<boolean>(false); // Stopwatch running state
  const [laps, setLaps] = useState<number[]>([]); // Array of lap times
  const intervalRef = useRef<number | null>(null); // Reference to store setInterval ID

  // Function to start or resume the stopwatch
  const startOrResumeTimer = () => {
    const currentTime = Date.now();
    if (startTime === null) {
      // If the timer has never been started before
      setStartTime(currentTime);
    } else {
      // Calculate the adjusted start time considering the paused time
      setStartTime(currentTime - pausedTime * 1000); // pausedTime is in seconds, so convert to milliseconds
    }
    setIsRunning(true);
  };

  // Function to pause the stopwatch
  const pauseTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    // Save the elapsed time at the point of pausing
    setPausedTime(timerCount);
    setIsRunning(false);
  };

  // Resets the stopwatch to initial state
  const resetTimer = () => {
    pauseTimer();
    setTimerCount(0);
    setLaps([]);
    setStartTime(null);
    setPausedTime(0);
  };

  // Records the current time as a lap
  const addLap = () => {
    setLaps((prevLaps) => [...prevLaps, timerCount]); // Append the new time to laps array
  };

  // Effect hook to handle the stopwatch functionality
  useEffect(() => {
    if (isRunning && startTime !== null) {
      intervalRef.current = setInterval(() => {
        const newTimerCount = Math.floor((Date.now() - startTime) / 1000);
        setTimerCount(newTimerCount);
      }, 1000); // Runs every 1000 milliseconds (1 second)
    } else if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Cleanup function to clear interval on component unmount or stop
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, startTime]);

  return (
    <View style={styles.container}>
      <View style={styles.stopWatchTextContainer}>
        <Text testID="timer-display" style={styles.stopWatchText}>
          {formatTime(timerCount)}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        {!isRunning ? (
          <StopWatchButton
            testID="start-btn"
            buttonText="Start"
            onPress={startOrResumeTimer}
          />
        ) : (
          <StopWatchButton
            testID="stop-btn"
            buttonText="Stop"
            onPress={pauseTimer}
            style={styles.redButton}
          />
        )}
        {isRunning && (
          <StopWatchButton testID="lap-btn" buttonText="Lap" onPress={addLap} />
        )}
        {!isRunning && (
          <StopWatchButton
            testID="reset-btn"
            buttonText="Reset"
            onPress={resetTimer}
          />
        )}
      </View>
      <ScrollView testID="lap-list" style={styles.lapsContainer}>
        {[...laps].reverse().map((lap, index) => (
          <View
            key={index}
            testID={`lap-item-${index}`}
            style={styles.lapItemContainer}
          >
            <Text style={styles.lapText}>{"Lap " + (laps.length - index)}</Text>
            <Text style={styles.lapText}>{formatTime(lap)}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

// Styles for the StopWatch component
const styles = StyleSheet.create({
  container: {
    flex: 1, // Flex grow to fill the screen
    backgroundColor: "#ffffff", // White background color for the app
    flexDirection: "column",
  },
  stopWatchTextContainer: {
    height: "45%", // Occupies 45% of the screen height
    alignItems: "center", // Centers content horizontally
    justifyContent: "center", // Centers content vertically
  },
  stopWatchText: {
    // Style for the stopwatch text
    fontSize: 60, // Large font size for better visibility
    // Add more styling as needed
  },
  buttonContainer: {
    flexDirection: "row", // Arranges buttons in a horizontal row
    justifyContent: "space-evenly", // Evenly spaces buttons across the container
  },
  redButton: {
    backgroundColor: "#DC143C", // Red background color
    shadowColor: "#000", // Black color for the shadow
    shadowOffset: {
      width: 0, // No horizontal shadow offset
      height: 4, // Vertical shadow offset for a raised effect
    },
    shadowOpacity: 0.3, // Partial opacity for the shadow
    shadowRadius: 5, // Blur radius for the shadow
  },
  // Container for the lap records
  lapsContainer: {
    marginTop: 20, // Top margin
    maxHeight: 300, // Maximum height to ensure it doesn't occupy too much space
    paddingHorizontal: 10, // Horizontal padding
  },
  // Style for each lap item in the list
  lapItemContainer: {
    flexDirection: "row", // Aligns lap number and time in a horizontal row
    justifyContent: "space-between", // Spaces the lap number and time on opposite ends
    paddingVertical: 10, // Vertical padding for each lap item
    width: "100%", // Occupies the full width of the container
    borderBottomColor: "#E0E0E0", // Color for the bottom border
    borderBottomWidth: 1, // Width of the bottom border
    paddingHorizontal: 10, // Horizontal padding within each lap item
    marginVertical: 2, // Vertical margin between lap items
  },
  // Style for the text in each lap item
  lapText: {
    fontSize: 18, // Font size for lap text
  },
});
