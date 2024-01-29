import React, { useEffect, useState } from "react";
import StopWatch from "../../Components/StopWatch/StopWatch";
import { StyleSheet, View } from "react-native";
import StopWatchButton from "../../Components/StopWatchButton/StopWatchButton";
import LapsList from "../../Components/LapsList/LapsList";

const StopWatchScreen = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [laps, setLaps] = useState([]);
  const [displayLaps, setDisplayLaps] = useState(false);
  const [startTime, setStartTime] = useState(0);

  useEffect(() => {
    let intervalID: number;
    if (isRunning) {
      intervalID = setInterval(() => {
        const currentTime = Date.now();
        setElapsedTime(
          (previousElapsedTime) =>
            previousElapsedTime + (currentTime - startTime)
        );
        setStartTime(currentTime);
      }, 1);
    }
    return () => clearInterval(intervalID);
  }, [isRunning, startTime]);

  const startTimer = () => {
    setStartTime(Date.now());
    setIsRunning(true);
  };

  const stopTimer = () => setIsRunning(false);

  // TODO: Use when "Reset" button added in
  const resetTimer = () => {
    setIsRunning(false); // TODO: Reset button should only appear AFTER we have stopped the timer -> Not needed later on
    setElapsedTime(0);
  };

  return (
    <View style={styles.container}>
      <View style={styles.stopwatchContainer}>
        <StopWatch time={elapsedTime} />
        <View style={styles.buttonContainer}>
          {isRunning ? (
            <>
              <StopWatchButton
                onPress={stopTimer}
                title="Stop"
                colour="#f94144"
              />
              <StopWatchButton
                onPress={() => {}}
                title="Lap"
                colour="#a5a58d"
              />
            </>
          ) : (
            <>
              <StopWatchButton
                onPress={startTimer}
                title="Start"
                colour="#90be6d"
              />
              <StopWatchButton
                onPress={resetTimer}
                title="Reset"
                colour="#ffe8d6"
              />
            </>
          )}
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
