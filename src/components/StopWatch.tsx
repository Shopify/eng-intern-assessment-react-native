import { Text, View, StyleSheet, Dimensions } from "react-native";
import StopWatchButton from "./StopWatchButton";
import { formatTime } from "../utils/utils";
import LapTable, { Lap } from "./LapTable";
import { useRef, useState } from "react";

/*
 * Handles StopWatch functionality and displays the elapsed time
 */
const StopWatch = () => {
  // Declare state variables
  const [time, setTime] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [laps, setLaps] = useState<Lap[]>([]);
  const stopwatchRef = useRef<number | null>(null);

  // Clear the previously set interval, if not null
  const clearPrevInterval = () => {
    if (stopwatchRef.current) {
      clearInterval(stopwatchRef.current);
    }
  };

  // Start Button for StopWatch functionality
  const onStart = () => {
    if (!isActive) {
      setIsActive(true);
      // Initiate interval that updates the elapsed StopWatch time every second
      stopwatchRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1000);
      }, 1000);
    }
  };

  // Pause Button for StopWatch functionality
  const onPause = () => {
    if (isActive && stopwatchRef.current) {
      setIsActive(false);
      clearPrevInterval();
    }
  };

  // Reset Button for StopWatch functionality
  const onReset = () => {
    setTime(0);
    setIsActive(false);
    setLaps([]);
    clearPrevInterval();
  };

  // Lap Button for StopWatch functionality
  const onLap = () => {
    // If laps array not empty, get endTime of last lap and set it to startTime of new lap
    const startTime = laps.length > 0 ? laps[laps.length - 1].endTime : 0;

    // To calculate duration of the lap, subtract startTime from the current time
    const duration = time - startTime;

    const lap = {
      number: laps.length + 1,
      startTime,
      endTime: time,
      duration,
    };

    setLaps((prevLaps) => [...prevLaps, lap]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>shopify stopwatch</Text>
      <Text style={styles.subtitle}>made by: vanessa hoang</Text>
      <Text style={styles.timer}>{formatTime(time)}</Text>
      <View style={styles.buttonContainer}>
        <StopWatchButton
          label="Reset"
          onPress={onReset}
          activeColour="#D8001F"
          disabled={!isActive && time === 0}
        />
        <StopWatchButton
          label={isActive ? "Pause" : "Start"}
          onPress={isActive ? onPause : onStart}
          activeColour={isActive ? "#007BFF" : "#7FB576"}
        />
        <StopWatchButton
          label="Lap"
          onPress={onLap}
          activeColour="#FFAB45"
          disabled={!isActive && time === 0}
        />
      </View>
      {laps.length > 0 && <LapTable laps={laps} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 80,
    color: "white",
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 13,
    textAlign: "center",
    marginTop: 10,
    color: "white",
  },
  timer: {
    fontSize: 64,
    textAlign: "center",
    marginTop: 60,
    color: "white",
    fontStyle: "italic",
    fontWeight: "600",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 60,
    marginHorizontal: 10,
  },
});

export default StopWatch;
