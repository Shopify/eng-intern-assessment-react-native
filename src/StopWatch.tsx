import { View, StyleSheet, Text } from "react-native";
import { useState, useEffect } from "react";
import StopWatchButton from "./StopWatchButton";
import { displayTime } from "./util/displayTime";
import { LapsList } from "./Components/LapsList";

export default function StopWatch() {
  const [stopWatchState, setStopWatchState] = useState("begin"); // Can be: begin, running, paused, stopped
  const [elapsedTime, setElapsedTime] = useState(0);
  const [laps, setLaps] = useState<number[] | null>(null); // Will store the lap numbers in seconds

  useEffect(() => {
    let intervalObj: ReturnType<typeof setInterval> | null;
    if (stopWatchState == "running") {
      // I am using setInterval from JavaScript as it is asynchronous and can be easily integrated
      intervalObj = setInterval(() => setElapsedTime(elapsedTime + 1), 1000);
    }
    return () => {
      // Clear the interval when the component unmounts or isRunning becomes false
      if (intervalObj) {
        clearInterval(intervalObj);
      }
    };
  }, [stopWatchState, elapsedTime]);
  const handleStart = () => {
    setStopWatchState("running");
  };
  const handleStop = () => {
    setStopWatchState("stopped");
  };
  const handlePause = () => {
    setStopWatchState("paused");
  };
  const handleReset = () => {
    setStopWatchState("begin");
    setElapsedTime(0);
    setLaps(null);
  };
  const handleLap = () => {
    if (stopWatchState == "running") {
      laps
        ? setLaps((prevState) => [...prevState, elapsedTime])
        : setLaps([elapsedTime]);
    }
  };

  return (
    <View style={styles.stopWatchContainer}>
      <View style={styles.timeContainer}>
        {stopWatchState !== "stopped" && ( // remove the time when stopped, as indicated in the tests
          <Text style={styles.timeText}>{displayTime(elapsedTime)}</Text>
        )}
      </View>
      <View style={styles.buttonContainer}>
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

      <LapsList laps={laps} />
    </View>
  );
}

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
