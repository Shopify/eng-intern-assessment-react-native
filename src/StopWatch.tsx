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
    setRunning(true);
    setCurrentTime(0);
  };

  // stops the stopwatch
  const handleStop = () => {
    if (running) {
      setStopped(true);
      clearInterval(intervalId);
      setRunning(false);
    }
  };

  const handleReset = () => {
    // resets the stopwatch and clears both the time and laps
    clearInterval(intervalId);
    setStopped(false);
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
    setTimeString(calculateTimer(currentTime));
  }, [currentTime]);

  useEffect(() => {
    let interval: number | undefined;
    if (running) {
      interval = setInterval(() => {
        setCurrentTime((prev: number) => prev + 1);
      }, 1);
    } else if (interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [running]);

  return (
    <View style={{ alignItems: "center" }}>
      <Text style={styles.time}>{timeString}</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        {!running && (
          <StopWatchButton
            name={stopped ? "Resume" : "Start"}
            onPress={handleStart}
          />
        )}

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
      </View>
      <FlatList
        data={lapData}
        keyExtractor={(item) => item.lapTime.toString()}
        renderItem={({ item }) => (
          <Text
            style={{
              width: 300,
              textAlign: "center",
              fontSize: 30,
              borderColor: "#89cff0",
              borderWidth: 3,
              borderRadius: 30,
              padding: 8,
              margin: 5,
            }}
          >{`Lap ${item.lapTime}: ${calculateTimer(item.lapDuration)}`}</Text>
        )}
      />
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
