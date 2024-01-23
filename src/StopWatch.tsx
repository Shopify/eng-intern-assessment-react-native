import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";

import StopWatchButton from "./StopWatchButton";

export default function StopWatch() {
  const [time, setTime] = useState(0);
  const [stopped, setStopped] = useState(false);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const [paused, setPaused] = useState(false);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    stopwatch: {
      width: 200,
      height: 200,
      borderRadius: 100,
      backgroundColor: "#ddd",
      justifyContent: "center",
      alignItems: "center",
    },
    timeText: {
      fontSize: 28,
      color: "#000",
    },
    lapText: {
      fontSize: 16,
      color: "#333",
    },
    buttonContainer: {
      margin: 5,
    },
    buttonsRow: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 20,
    },
    lapsContainer: {
      flex: 1,
      marginTop: 20,
      width: "100%",
    },
  });

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      interval && clearInterval(interval);
    }
    return () => interval && clearInterval(interval);
  }, [running]);

  const handleStart = () => {
    setRunning(true);
    setStopped(false);
  };

  const handleStop = () => {
    setRunning(false);
    setPaused(false);
    setLaps([]);
    setTime(0);
    setStopped(true);
  };

  // Updated handleStop function to handlePause
  const handlePause = () => {
    setPaused(true);
    setRunning(false);
  };

  const handleReset = () => {
    setTime(0);
    setLaps([]);
  };

  const handleResume = () => {
    setRunning(true);
    setPaused(false);
    setTime((prev) => prev + 1);
  };

  const handleLap = () => {
    setLaps([...laps, time]);
  };

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <View style={styles.container}>
      <View
        style={{ flex: 2, justifyContent: "flex-end", alignItems: "center" }}
      >
        <View style={styles.stopwatch}>
          {!stopped && <Text style={styles.timeText}>{formatTime(time)}</Text>}
          {stopped && <Text style={styles.timeText}>Stopped!</Text>}
        </View>

        <View style={styles.buttonsRow}>
          {!(running || paused) && (
            <StopWatchButton title="Start" onPress={handleStart} />
          )}
          {!running && paused && (
            <StopWatchButton title="Resume" onPress={handleResume} />
          )}
          {running && !paused && (
            <StopWatchButton title="Pause" onPress={handlePause} />
          )}
          {(running || paused) && (
            <>
              <StopWatchButton title="Lap" onPress={handleLap} />
              <StopWatchButton title="Reset" onPress={handleReset} />
              <StopWatchButton title="Stop" onPress={handleStop} />
            </>
          )}
        </View>
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {!!laps.length && (
          <ScrollView
            style={styles.lapsContainer}
            showsVerticalScrollIndicator={false}
            testID="lap-list"
          >
            {laps.map((lap, index) => (
              <Text key={index} style={styles.lapText} testID={`lap-${index}`}>
                {`Lap ${index + 1}: ${formatTime(lap)}`}
              </Text>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
}
