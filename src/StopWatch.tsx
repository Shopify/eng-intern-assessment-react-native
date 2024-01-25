import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import StopWatchButton from "./components/StopWatchButton";
import StopWatchDigitalCounter from "./components/StopWatchDigitalCounter";
import StopWatchLaps from "./components/StopWatchLaps";
import { colors } from "./styles";

/**
 * The StopWatch component.
 *
 * This component serves as the main container for the stopwatch application.
 * It manages the state and logic for timing, laps, and controls for starting,
 * stopping, resetting, and recording laps of the stopwatch.
 */
export default function StopWatch() {
  // State variables
  const [isRunning, setIsRunning] = useState(false); // Whether the stopwatch is running
  const [timeElapsed, setTimeElapsed] = useState(0); // Time elapsed in milliseconds
  const [laps, setLaps] = useState<number[]>([]); // Array of lap times

  /**
   * Effect hook to manage the interval timer.
   *
   * Sets up an interval that updates the elapsed time every 10ms when the stopwatch is running.
   * Clears the interval when the stopwatch is stopped.
   */
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;

    if (isRunning) {
      interval = setInterval(() => {
        setTimeElapsed((oldTime) => oldTime + 10);
      }, 10);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  // Event handlers
  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeElapsed(0);
    setLaps([]);
  };

  const handleLap = () => {
    setLaps((prevLaps) => [...prevLaps, timeElapsed]);
  };

  // Calculating lap durations and identifying the longest and shortest laps
  const lapDurations = laps.map((lap, index) =>
    index === 0 ? lap : lap - laps[index - 1]
  );

  const maxLapDuration = Math.max(...lapDurations, 0);
  const minLapDuration =
    lapDurations.length > 0
      ? Math.min(...lapDurations.filter((lap) => lap > 0))
      : 0;
  const maxLapIndex = lapDurations.findIndex((lap) => lap === maxLapDuration);
  const minLapIndex =
    minLapDuration > 0
      ? lapDurations.findIndex((lap) => lap === minLapDuration)
      : null;

  return (
    <View style={styles.container}>
      {/* Counter and Control Buttons */}
      <View style={styles.staticContainer}>
        <StopWatchDigitalCounter time={timeElapsed} />
        <StopWatchButton
          onStartStop={handleStartStop}
          onReset={handleReset}
          onLap={handleLap}
          isRunning={isRunning}
        />
      </View>

      {/* Laps Display */}
      <StopWatchLaps
        laps={lapDurations}
        maxLapIndex={maxLapIndex}
        minLapIndex={minLapIndex}
      />
    </View>
  );
}

/**
 * Styles for the StopWatch component.
 */
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  staticContainer: {
    height: "45%",
  },
});
