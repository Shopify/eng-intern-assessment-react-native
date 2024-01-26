import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import StopWatchButton from "./StopWatchButton";
import calculateTimer from "./utils/timeUtils";

type LapData = {
  lapTime: number;
  lapDuration: number;
};

export default function StopWatch() {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [timeString, setTimeString] = useState<string>("");
  const [intervalId, setIntervalId] = useState<number>(0);
  const [running, setRunning] = useState<boolean>(false);
  const [lapData, setLapData] = useState<LapData[]>([]);
  const [stopped, setStopped] = useState<boolean>(false);

  // starts or resumes the stopwatch
  const handleStart = () => {
    setStopped(false);
    if (!running) {
      const interval: any = setInterval(() => {
        setCurrentTime((prev: number) => prev + 1);
      }, 1);

      setRunning(true);
      setIntervalId(interval);
    }
  };

  // stops the stopwatch
  const handleStop = () => {
    setStopped(true);
    clearInterval(intervalId);
    setRunning(false);
  };

  const handleReset = () => {
    // resets the stopwatch and clears both the time and laps
    clearInterval(intervalId);
    setRunning(false);
    setCurrentTime(0);
    setLapData([]);
  };

  const handleLap = () => {
    // Calculates the total lap duration
    const totalLapDuration = lapData.reduce(
      (total, lap) => total + lap.lapDuration,
      0
    );
    if (lapData.length === 0) {
      // If it's the first lap store the current time as the lap duration
      setLapData([{ lapTime: 1, lapDuration: currentTime }]);
    } else {
      // Calculate the lap duration as the difference between the current time and the total lap time
      const lapDuration = currentTime - totalLapDuration;

      // Adds lap data to the array
      setLapData((prevLapData) => [
        ...prevLapData,
        { lapTime: lapData.length + 1, lapDuration },
      ]);
    }
  };

  useEffect(() => {
    let timeString: string = calculateTimer(currentTime);
    setTimeString(timeString);
  }, [currentTime]);

  return (
    <View>
      <Text style={styles.time}>{timeString}</Text>
      <StopWatchButton
        name={stopped ? "Resume" : "Start"}
        onPress={handleStart}
      />
      <StopWatchButton name="Stop" onPress={handleStop} />
      <StopWatchButton name="Reset" onPress={handleReset} />
      <StopWatchButton name="Lap" onPress={handleLap} />

      <FlatList
        data={lapData}
        keyExtractor={(item) => item.lapTime.toString()}
        renderItem={({ item }) => (
          <Text>{`Lap ${item.lapTime}: ${calculateTimer(
            item.lapDuration
          )}`}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  time: {
    margin: 50,
    fontSize: 30,
    fontWeight: "bold",
  },
});
