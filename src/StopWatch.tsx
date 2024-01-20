import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import StopWatchButton from "./StopWatchButton";
import LapTimes from "./LapTimes";
import { formatTime } from "./util/formatTime";

const Stopwatch: React.FC = () => {
  const [isRunning, setIsRunning] = useState<boolean>(false); // Tracks if stopwatch is running
  const [time, setTime] = useState<number>(0); // Current time in milliseconds
  const [lapTimes, setLapTimes] = useState<number[]>([]); // Array of lap times
  const [lastLapTime, setLastLapTime] = useState<number>(0); // Time at last lap

  // Effect hook to update time every second when stopwatch is running
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1000); // Increase time by 1 second
      }, 1000);
    } else if (interval) {
      clearInterval(interval); // Clear interval when stopwatch stops
    }

    return () => {
      if (interval) {
        clearInterval(interval); // Cleanup on component unmount
      }
    };
  }, [isRunning]);

  // Function to start/stop the stopwatch
  const handleStartStop = (): void => {
    setIsRunning(!isRunning);
  };

  // Function to reset the stopwatch
  const handleReset = (): void => {
    setIsRunning(false);
    setLapTimes([]);
    setTime(0);
    setLastLapTime(0);
  };

  // Function to record a lap time
  const handleLap = (): void => {
    const lastLap = time - lastLapTime;
    setLapTimes([lastLap, ...lapTimes]);
    setLastLapTime(time);
  };

  return (
    <View style={styles.container}>
      <View style={styles.timerBox}>
        <Text style={styles.timer} testID={"main-timer"}>
          {formatTime(time)}
        </Text>
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
