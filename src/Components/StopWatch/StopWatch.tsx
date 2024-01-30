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
        <Text style={styles.timeDisplay} testID="elapsed-time">
          {formatTime(elapsedTime)}
        </Text>
        <View style={styles.buttonContainer}>
          {isRunning ? (
            <>
              <StopWatchButton
                onPress={stopTimer}
                title="Stop"
                colour="#ffa69e"
              />
              <StopWatchButton
                onPress={() => {
                  addLap(elapsedTime);
                }}
                title="Lap"
                colour="#b5e2fa"
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
                colour="#d5bdaf"
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
    width: "80%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  stopwatchContainer: {
    height: "40%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  timeDisplay: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#e9ecef",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
    gap: 8,
  },
});

export default StopWatch;
