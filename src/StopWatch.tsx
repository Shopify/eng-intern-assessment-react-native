import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import StopWatchButton from "./StopWatchButton";
import calculateTimer from "./utils/timeUtils";

export default function StopWatch() {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [timeString, setTimeString] = useState<string>("");
  const [running, setRunning] = useState<boolean>(false);
  const [lapData, setLapData] = useState<number[]>([]);
  const [stopped, setStopped] = useState<boolean>(false);

  // starts or resumes the stopwatch
  const handleStart = () => {
    setStopped(false);
    setRunning(true);
  };

  // stops the stopwatch
  const handleStop = () => {
    setStopped(true);
    setRunning(false);
  };

  const handleReset = () => {
    // resets the stopwatch and clears both the time and laps
    setStopped(false);
    setRunning(false);
    setCurrentTime(0);
    setLapData([]);
  };

  const handleLap = () => {
    // Calculates the total lap duration
    const totalLapDuration = lapData.reduce((total, lap) => total + lap, 0);
    if (lapData.length === 0) {
      // If it's the first lap store the current time as the lap duration
      setLapData([currentTime]);
    } else {
      // Calculate the lap duration as the difference between the current time and the total lap time
      const lapDuration = currentTime - totalLapDuration;

      // Adds lap data to the array
      setLapData((prevLapData) => [...prevLapData, lapDuration]);
    }
  };

  // updates the time
  useEffect(() => {
    setTimeString(calculateTimer(currentTime));
  }, [currentTime]);

  // sets the time
  useEffect(() => {
    let interval: number | undefined;
    if (running) {
      // starts an interval and updates the current time accordingly
      interval = setInterval(() => {
        setCurrentTime((prev: number) => prev + 1);
      }, 1);
    }
    // ensures that the interval is cleared when not running
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [running]);

  return (
    <View style={{ alignItems: "center" }}>
      {/* time display */}
      <Text style={styles.time}>{timeString}</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        {/* Start/resume button */}
        {!running && (
          <StopWatchButton
            name={stopped ? "Resume" : "Start"}
            onPress={handleStart}
          />
        )}

        {/* shows the reset or stop and lap buttons based on if the stop button was pressed */}
        {stopped ? (
          <StopWatchButton name="Reset" onPress={handleReset} />
        ) : (
          <View>
            {running && (
              <View style={{ alignItems: "center", flexDirection: "row" }}>
                <StopWatchButton name="Lap" onPress={handleLap} />
                <StopWatchButton name="Stop" onPress={handleStop} />
              </View>
            )}
          </View>
        )}
        {/* lap list */}
      </View>
      {lapData.length > 0 && (
        <ScrollView testID="lap-list">
          <View
            style={{
              width: 400,
              height: 2,
              backgroundColor: "black",
              marginVertical: 30,
            }}
          ></View>
          {lapData.map((lap, index) => (
            <Text
              style={{ fontSize: 30, textAlign: "center" }}
              testID="lap-text"
              key={index}
            >
              {`Lap ${index + 1} : ${calculateTimer(lap)}`}
            </Text>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  time: {
    margin: 50,
    fontSize: 50,
    fontWeight: "bold",
  },
});
