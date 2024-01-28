import React, { useState } from "react";
import StopWatch from "../../Components/StopWatch/StopWatch";
import { StyleSheet, View } from "react-native";
import StopWatchButton from "../../Components/StopWatchButton/StopWatchButton";
import LapsList from "../../Components/LapsList/LapsList";

const StopWatchScreen = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [laps, setLaps] = useState([]);
  const [displayLaps, setDisplayLaps] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.stopwatchContainer}>
        <StopWatch />
        <View style={styles.buttonContainer}>
          <StopWatchButton />
          <StopWatchButton />
        </View>
      </View>
      <LapsList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  stopwatchContainer: {
    height: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
  },
});

export default StopWatchScreen;
