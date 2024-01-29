import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import StopWatchButton from "../StopWatchButton/StopWatchButton";
import LapsList from "../LapsList/LapsList";
import { formatTime } from "../../utils/TimeUtils";

const StopWatch = () => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [laps, setLaps] = useState<number[]>([]);
  const [startTime, setStartTime] = useState<number>(0);

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

  const resetTimer = () => {
    setElapsedTime(0);
    setLaps([]);
  };

  const addLap = (time: number) => {
    setLaps([...laps, time]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.stopwatchContainer}>
        <Text testID="elapsed-time">{formatTime(elapsedTime)}</Text>
        <View style={styles.buttonContainer}>
          {isRunning ? (
            <>
              <StopWatchButton
                onPress={stopTimer}
                title="Stop"
                colour="#f94144"
              />
              <StopWatchButton
                onPress={() => {
                  addLap(elapsedTime);
                }}
                title="Lap"
                colour="#a5a58d"
              />
            </>
          ) : (
            <>
              <StopWatchButton
                onPress={startTimer}
                title={elapsedTime === 0 ? "Start" : "Resume"}
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
      {laps.length > 0 && <LapsList laps={laps} />}
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

export default StopWatch;
