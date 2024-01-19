import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import StopWatchButton from "./StopWatchButton";
import LapTimes from "./LapTimes";
import { formatTime } from "./util/formatTime";

const Stopwatch: React.FC = () => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const [lapTimes, setLapTimes] = useState<number[]>([]);
  const [lastLapTime, setLastLapTime] = useState<number>(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1000);
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning]);

  const handleStartStop = (): void => {
    setIsRunning(!isRunning);
  };

  const handleReset = (): void => {
    setIsRunning(false);
    setLapTimes([]);
    setTime(0);
    setLastLapTime(0);
  };

  const handleLap = (): void => {
    const lastLap = time - lastLapTime;
    setLapTimes([lastLap, ...lapTimes]);
    setLastLapTime(time);
  };

  return (
    <View style={styles.container}>
      <View style={styles.timerBox}>
        <Text style={styles.timer}>{formatTime(time)}</Text>
      </View>
      <View style={styles.buttons}>
        <StopWatchButton
          name={isRunning ? "Lap" : "Reset"}
          color="gray"
          onPress={isRunning ? handleLap : handleReset}
        />
        <StopWatchButton
          name={isRunning ? "Stop" : "Start"}
          color={isRunning ? "red" : "green"}
          onPress={handleStartStop}
        />
      </View>
      <LapTimes lapTimes={lapTimes} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  timerBox: {
    justifyContent: "center",
    alignContent: "center",
    height: "25%",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    marginBottom: 20,
    gap: 100,
  },
  button: {
    marginHorizontal: 10,
  },
  border: {
    width: "80%",
    backgroundColor: "black",
    height: 1,
  },
  timer: {
    fontSize: 70,
  },
});

export default Stopwatch;
