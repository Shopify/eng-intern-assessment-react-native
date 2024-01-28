import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import StopWatchButton from "./StopWatchButton";

const StopWatch: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [laps, setLaps] = useState<number[]>([]);
  const [pauseTime, setPauseTime] = useState<number>(0);

  const startStopwatch = () => {
    if (isPaused) {
      // Resume
      setStartTime((prevStartTime) => (prevStartTime ?? 0) + Date.now() - pauseTime);
      setIsPaused(false);
    } else {
      // Start
      setStartTime(Date.now() - elapsedTime);
      setIsRunning(true);
    }
  };

  const pauseStopwatch = () => {
    setIsPaused(true);
    setPauseTime(Date.now());
  };

  const stopStopwatch = () => {
    setIsRunning(false);
    setIsPaused(false);
    setStartTime(null);
    setElapsedTime(0);
    setLaps([]);
  };

  const resetStopwatch = () => {
    setIsRunning(false);
    setIsPaused(false);
    setStartTime(null);
    setElapsedTime(0);
    setLaps([]);
  };

  const recordLap = () => {
    if (startTime !== null) {
      setLaps((prevLaps) => [...(prevLaps || []), elapsedTime]);
    }
  };

  useEffect(() => {
    let interval: number | undefined;

    if (isRunning && !isPaused) {
      const updateElapsedTime = () => {
        setElapsedTime(Date.now() - (startTime || 0));
      };

      interval = setInterval(updateElapsedTime, 100);

      // Immediately update elapsed time after starting or resuming to avoid delay
      updateElapsedTime();
    } else if (interval !== undefined) {
      clearInterval(interval);
    }

    return () => {
      if (interval !== undefined) {
        clearInterval(interval);
      }
    };
  }, [isRunning, isPaused, startTime]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}:${String(milliseconds).padStart(2, "0")}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>{formatTime(elapsedTime)}</Text>
      <View style={styles.buttonsContainer}>
        {!isRunning && !isPaused && (
          <StopWatchButton label="Start" onPress={startStopwatch} color="green"/>
        )}
        {isRunning && (
          <StopWatchButton
            label={isRunning && !isPaused ? "Pause" : "Resume"}
            onPress={isRunning && !isPaused ? pauseStopwatch : startStopwatch}
            color="orange"
          />
        )}
        <StopWatchButton
          label="Reset"
          onPress={resetStopwatch}
          color="plum"
        />
        <StopWatchButton label="Lap" onPress={recordLap} color="dodgerblue"/>
        <StopWatchButton label="Stop" onPress={stopStopwatch} color="red"/>
      </View>
      <View style={styles.lapsContainer}>
        {laps.map((lapTime, index) => (
          <Text style={styles.lapText} key={index} testID="lap-list">
            Lap {index + 1}: {formatTime(Number(lapTime))}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  timer: {
    fontSize: 32,
    fontWeight: "bold",
    marginVertical: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  lapsContainer: {
    position: "absolute",
    alignItems: "flex-start",
    top: 510,
  },
  lapText: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: "bold",
  },
});

export default StopWatch;
