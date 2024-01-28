import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import StopWatchButton from "./StopWatchButton";
import { COLORS } from "./../constants/colors"

const StopWatch: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [laps, setLaps] = useState<number[]>([]);
  const [pauseTime, setPauseTime] = useState<number>(0);

  const startStopwatch = () => {
    console.log("Start");
    if (isPaused) {
      // Resume
      setStartTime(
        (prevStartTime) => (prevStartTime ?? 0) + Date.now() - pauseTime
      );
      setIsPaused(false);
    } else {
      // Start
      setStartTime(Date.now() - elapsedTime);
      setIsRunning(true);
    }
  };

  const pauseStopwatch = () => {
    console.log("Pause");
    setIsPaused(true);
    setPauseTime(Date.now());
  };

  const stopStopwatch = () => {
    console.log("Stop");
    setIsRunning(false);
    setIsPaused(false);
  };

  const resetStopwatch = () => {
    console.log("Reset");
    setIsRunning(false);
    setIsPaused(false);
    setStartTime(null);
    setElapsedTime(0);
    setLaps([]);
  };

  const recordLap = () => {
    if (startTime !== null) {
      setLaps([...laps, elapsedTime]);
    }
  };

  useEffect(() => {
    let interval: number | undefined;
  
    if (isRunning && !isPaused) {
      interval = setInterval(() => {
        setElapsedTime(prevTime => prevTime + 100);
      }, 100);
  
      // Immediately update elapsed time after starting or resuming to avoid delay
      setElapsedTime(prevTime => Date.now() - (startTime || 0));
    }
  
    return () => {
      if (typeof interval !== 'undefined') {
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
      <Text style={styles.headerText}>Stopwatch</Text>
      <Text style={styles.timer}>{formatTime(elapsedTime)}</Text>
      <View style={styles.buttonsContainer}>
        {!isRunning && !isPaused && (
          <StopWatchButton
            label="Start"
            onPress={startStopwatch}
            color={COLORS.buttonStart}
          />
        )}
        {isRunning && (
          <StopWatchButton
            label={isRunning && !isPaused ? "Pause" : "Resume"}
            onPress={isRunning && !isPaused ? pauseStopwatch : startStopwatch}
            color={COLORS.buttonPauseAndResume}
          />
        )}
        <StopWatchButton label="Reset" onPress={resetStopwatch} color={COLORS.buttonReset} />
        <StopWatchButton label="Lap" onPress={recordLap} color={COLORS.buttonLap} />
        <StopWatchButton label="Stop" onPress={stopStopwatch} color={COLORS.buttonStop} />
      </View>
      <ScrollView
        style={styles.lapsContainer}
        contentContainerStyle={styles.scrollContent}
        testID="lap-list"
      >
        {laps.map((lapTime, index) => (
          <Text style={styles.lapText} key={index} testID="lap-text">
            Lap {index + 1}: {formatTime(Number(lapTime))}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  headerText: { 
    fontSize: 28, 
    fontWeight: "bold", 
    marginTop: 20,
    marginBottom: 20,
    color: COLORS.headerText,
  },
  timer: {
    fontSize: 40,
    fontWeight: "bold",
    marginVertical: 20,
    color: COLORS.timerText,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 400,
  },
  lapsContainer: {
    position: "absolute",
    top: 450,
    height: 300,
    width: 300,
    borderColor: COLORS.lapContainerBorder,
    borderWidth: 2,
    borderRadius: 10,
  },
  scrollContent: {
    alignItems: "center",
  },
  lapText: {
    fontSize: 25,
    marginBottom: 5,
    fontWeight: "bold",
    color: COLORS.lapText,
  },
});

export default StopWatch;
