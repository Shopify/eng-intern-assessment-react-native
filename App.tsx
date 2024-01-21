import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import StopWatch from "./src/StopWatch";
import StopWatchButton from "./src/StopWatchButton";
import { useEffect, useState, useRef } from "react";
import { formatTime } from "./utils/utils";

// Main App Component
export default function App() {
  // State declarations
  const [startTime, setStartTime] = useState<number | null>(null); // Start time of the stopwatch
  const [pausedTime, setPausedTime] = useState<number>(0); // Accumulated paused time
  const [timerCount, setTimerCount] = useState<number>(0); // Elapsed time in milliseconds
  const [isRunning, setIsRunning] = useState<boolean>(false); // Stopwatch running state
  const [laps, setLaps] = useState<number[]>([]); // Array of lap times
  const intervalRef = useRef<number | null>(null); // Reference to store setInterval ID

  // Starts or resumes the stopwatch
  const startTimer = () => {
    const currentTime = Date.now();
    setStartTime((prevStartTime) =>
      prevStartTime ? currentTime - pausedTime : currentTime
    );
    setIsRunning(true);
  };

  // Stops the stopwatch
  const stopTimer = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }
    if (startTime) {
      setPausedTime(Date.now() - startTime); // Calcuate paused time
    }

    setIsRunning(false); // Stop timer
  };

  // Resets the stopwatch to initial state
  const resetTimer = () => {
    stopTimer();
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
        setTimerCount(Date.now() - startTime);
      }, 10); // Runs every 10 milliseconds
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

  // Component render
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.stopWatchContainer}>
        <StopWatch currentTime={timerCount} />
      </View>

      <View style={styles.buttonContainer}>
        {!isRunning && (
          <StopWatchButton buttonText={"Start"} onPress={startTimer} />
        )}
        {isRunning && (
          <StopWatchButton
            buttonText={"Stop"}
            onPress={stopTimer}
            style={styles.redButton}
          />
        )}
        {isRunning && <StopWatchButton buttonText={"Lap"} onPress={addLap} />}
        {!isRunning && (
          <StopWatchButton buttonText={"Reset"} onPress={resetTimer} />
        )}
      </View>

      <ScrollView style={styles.lapsContainer}>
        {[...laps].reverse().map((lap, index) => (
          <View key={index} style={styles.lapItemContainer}>
            <Text style={styles.lapText}>{"Lap " + (laps.length - index)}</Text>
            <Text style={styles.lapText}>{formatTime(lap)}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // Main container style for the entire app view
  container: {
    flex: 1, // Flex grow to fill the screen
    backgroundColor: "#ffffff", // White background color for the app
  },
  // Container for the stopwatch display
  stopWatchContainer: {
    height: "45%", // Occupies 45% of the screen height
    alignItems: "center", // Centers content horizontally
    justifyContent: "center", // Centers content vertically
  },
  // Container for the stopwatch control buttons
  buttonContainer: {
    flexDirection: "row", // Arranges buttons in a horizontal row
    justifyContent: "space-evenly", // Evenly spaces buttons across the container
  },
  // Specific style for the 'Stop' button
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
