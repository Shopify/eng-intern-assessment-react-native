// Import necessary components from react-native and react
import { View, StyleSheet, Text } from "react-native";
import { useState, useEffect } from "react";
// Import custom components and utility functions
import StopWatchButton from "./StopWatchButton";
import { displayTime } from "./util/displayTime";
import { LapsList } from "./Components/LapsList";

// Define the StopWatch component
export default function StopWatch() {
  // State for managing the stopwatch status
  const [stopWatchState, setStopWatchState] = useState("begin"); // Can be: begin, running, paused, stopped
  const [elapsedTime, setElapsedTime] = useState(0); // Will store the elapsed time in seconds
  const [laps, setLaps] = useState(null); // State to store lap times

  // useEffect hook to handle the stopwatch functionality
  useEffect(() => {
    let intervalObj: ReturnType<typeof setInterval> | null;
    if (stopWatchState == "running") {
      // Set an interval to increment the elapsed time every second
      intervalObj = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
      }, 1000);
    }
    return () => {
      // Clear the interval when the component unmounts or stopWatchState changes
      if (intervalObj) {
        clearInterval(intervalObj);
      }
    };
  }, [stopWatchState, elapsedTime]);

  // Function to handle starting the stopwatch
  const handleStart = () => {
    setStopWatchState("running");
  };

  // Function to handle stopping the stopwatch
  const handleStop = () => {
    setStopWatchState("stopped");
  };

  // Function to handle pausing the stopwatch
  const handlePause = () => {
    setStopWatchState("paused");
  };

  // Function to handle resetting the stopwatch
  const handleReset = () => {
    setStopWatchState("begin");
    setElapsedTime(0);
    setLaps(null);
  };

  // Function to handle recording a lap
  const handleLap = () => {
    if (stopWatchState == "running") {
      laps
        ? setLaps((prevState) => [...prevState, elapsedTime])
        : setLaps([elapsedTime]);
    }
  };

  // Render the stopwatch UI
  return (
    <View style={styles.stopWatchContainer}>
      <View style={styles.timeContainer}>
        {stopWatchState !== "stopped" && ( // Only display the time if stopwatch is not stopped
          <Text style={styles.timeText}>{displayTime(elapsedTime)}</Text>
        )}
      </View>
      <View style={styles.buttonContainer}>
        {/* Render buttons based on the current state of the stopwatch */}
        {(stopWatchState === "begin" || stopWatchState === "stopped") && (
          <StopWatchButton
            label={"Start"}
            handlePress={handleStart}
            backgroundColor={"#64cc6e"}
          />
        )}
        {stopWatchState === "running" && (
          <StopWatchButton
            label={"Pause"}
            handlePress={handlePause}
            backgroundColor={"#f0b754"}
          />
        )}

        {stopWatchState === "paused" && (
          <StopWatchButton
            label={"Resume"}
            handlePress={handleStart}
            backgroundColor={"#64cc6e"}
          />
        )}
        {stopWatchState === "running" && (
          <StopWatchButton
            label={"Stop"}
            handlePress={handleStop}
            backgroundColor={"#fa4c25"}
          />
        )}

        <StopWatchButton
          label={"Reset"}
          handlePress={handleReset}
          backgroundColor={"#64cc6e"}
        />
        <StopWatchButton
          label={"Lap"}
          handlePress={handleLap}
          backgroundColor={"#5476f0"}
        />
      </View>

      {/* Render the list of laps */}
      <LapsList laps={laps} />
    </View>
  );
}

// StyleSheet for styling the component
const styles = StyleSheet.create({
  stopWatchContainer: {
    flex: 1,
    paddingBottom: 40,
  },
  timeContainer: {
    flex: 0.6,
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  timeText: {
    fontSize: 50,
    fontWeight: "bold",
    justifyContent: "center",
    textAlign: "center",
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
});
