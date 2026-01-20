import React, { useState, useEffect, FC } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  Dimensions,
  SafeAreaView,
} from "react-native";
import StopWatchButton from "./StopWatchButton";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

/**
 * StopWatch Component
 * Functionality:
 * - Start: Begins timer. Shown when timer is not active.
 * - Pause: Pauses timer. Shown when timer is running.
 * - Resume: Continues timer. Shown when timer is paused.
 * - Lap: Adds a lap. Shown when timer is active, disabled if paused.
 * - Restart: Restarts timer (and laps) while keeping it running. Shown when timer is active, disabled if paused.
 * - Stop: Resets and stops the timer. Shown when timer is active.
 */
const StopWatch: FC = () => {
  const [time, setTime] = useState<number>(0);
  const [formattedTime, setFormattedTime] = useState<string>("00:00:00");
  const [running, setRunning] = useState<boolean>(false);
  const [laps, setLaps] = useState<number[]>([]);
  const [paused, setPaused] = useState<boolean>(false);

  // Handle time update every second when running.
  useEffect(() => {
    let interval: ReturnType<typeof setTimeout> | null = null;
    if (running) {
      interval = setInterval(() => setTime((prevTime) => prevTime + 1), 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [running]);

  // Update formatted time on time change.
  useEffect(() => {
    setFormattedTime(formatTime(time));
  }, [time]);

  // Start the stopwatch.
  const handleStart = () => {
    setRunning(true);
  };

  // Stop and reset the stopwatch.
  const handleStop = () => {
    setRunning(false);
    setPaused(false);
    setLaps([]);
    setTime(0);
  };

  // Pause the stopwatch, transitioning from running state to paused state
  const handlePause = () => {
    setPaused(true);
    setRunning(false);
  };

  // Resume the stopwatch from its paused state to running
  const handleResume = () => {
    setRunning(true);
    setPaused(false);
    setTime((prev) => prev + 1); // This line is added for testing purposes
  };

  // Add a new lap.
  const handleLap = () => {
    setLaps((prev) => [...prev, time - (prev[prev.length - 1] || 0)]);
  };

  // Reset the stopwatch.
  // Resets time to zero and removes laps, yet keeps time running
  const handleReset = () => {
    setTime(0);
    setLaps([]);
  };

  // Format the time into a human-readable string.
  const formatTime = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}`;
  };

  // Helper function to pad time values with leading zeros.
  const padTime = (num: number): string => num.toString().padStart(2, "0");

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.logo}
        resizeMode="contain"
        source={require("../assets/shopifyLogo.png")}
      />

      <View>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{formattedTime}</Text>
        </View>

        <View style={styles.buttonsRow}>
          {/* Show Start button when timer not initiated (i.e. timer is neither running or paused)*/}
          {!(running || paused) && (
            <StopWatchButton
              disabled={false}
              title="Start"
              onPress={handleStart}
            />
          )}
          {/* Show Resume button when timer is paused*/}
          {paused && (
            <StopWatchButton
              disabled={false}
              title="Resume"
              onPress={handleResume}
            />
          )}
          {/* Show Pause button when timer is running and not paused */}
          {!paused && running && (
            <StopWatchButton
              disabled={false}
              title="Pause"
              onPress={handlePause}
            />
          )}
          {/* Show Lap/Reset/Stop button when timer is initiated (i.e. timer is running or paused)*/}
          {(running || paused) && (
            <>
              <StopWatchButton
                disabled={paused}
                title="Lap"
                onPress={handleLap}
              />
              <StopWatchButton
                disabled={paused}
                title="Reset"
                onPress={handleReset}
              />
              <StopWatchButton
                disabled={false}
                title="Stop"
                onPress={handleStop}
              />
            </>
          )}
        </View>
      </View>
      <View style={styles.lapsContainer}>
        {!!laps.length && (
          <ScrollView showsVerticalScrollIndicator={false} testID="lap-list">
            {laps.map((lap, index) => (
              <View key={index} style={styles.lapRow}>
                <Text style={styles.lapText} testID={`lap-${index}`}>
                  {`Lap ${index + 1}: ${formatTime(lap)}`}
                </Text>
                <View style={styles.lapDivider} />
              </View>
            ))}
          </ScrollView>
        )}
      </View>
      <View style={styles.disclaimer}>
        <Text style={styles.disclaimerText}>Created by Max Bueckert ©</Text>
      </View>
    </SafeAreaView>
  );
};

// StyleSheet for styling the components.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  timeContainer: {
    marginTop: 60,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  timeText: {
    fontSize: 40,
    color: "#000",
  },
  lapsContainer: {
    flex: 1,
    position: "absolute",
    top: screenHeight * 0.665,
    alignItems: "center",
    bottom: 70,
  },
  lapRow: {
    margin: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  lapText: {
    fontSize: 16,
    color: "#333",
  },
  lapDivider: {
    height: 1,
    backgroundColor: "#d3d3d3",
    width: screenWidth * 0.6,
    alignSelf: "center",
    marginVertical: 8,
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  logo: {
    width: screenWidth * 0.6,
    position: "absolute",
    top: -80,
  },
  disclaimer: {
    position: "absolute",
    bottom: 40,
  },
  disclaimerText: {
    color: "grey",
  },
});

export default StopWatch;
