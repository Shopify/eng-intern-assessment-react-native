import React, { useState, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import StopWatchButton from "./StopWatchButton";

interface StopwatchProps {}

const Stopwatch: React.FC<StopwatchProps> = () => {
  const [time, setTime] = useState<number>(0);
  const [running, setRunning] = useState<boolean>(false);
  const [laps, setLaps] = useState<number[]>([]);
  const intervalIdRef = useRef<number | null>(null);

  const formatTime = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    const formattedMilliseconds = String(
      Math.floor((milliseconds % 1000) / 10)
    ).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
  };

  const startStopwatch = () => {
    if (!running) {
      setRunning(true);
      const startTime = Date.now() - time;
      intervalIdRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 90);
    } else {
      setRunning(false);
      clearInterval(intervalIdRef.current!);
      intervalIdRef.current = null;
    }
  };

  const resetStopwatch = () => {
    setRunning(false);
    clearInterval(intervalIdRef.current!);
    intervalIdRef.current = null;
    setTime(0);
    setLaps([]);
  };

  const recordLap = () => {
    setLaps((prevLaps) => [...prevLaps, time]);
  };

  return (
    <View>
  <Text style={styles.stopwatchTitle}>{formatTime(time)}</Text>
      <View style={styles.buttonContainer}>
        <StopWatchButton
          title={running ? "Pause" : "Start"}
          onPress={startStopwatch}
          running={running}
        />
        <StopWatchButton title="Lap" onPress={recordLap} disabled={!running} />
        <StopWatchButton
          title="Reset"
          onPress={resetStopwatch}
        />
      </View>
      <View>
        {laps.map((lap, index) => (
          <Text style={styles.lapsTextItem} key={index}>{`${formatTime(lap)}`}</Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  stopwatchTitle: {
    textAlign: "center",
    fontSize: 50,
    fontWeight: "bold",
  },
  buttonContainer: { 
    flexDirection: "row", justifyContent: 'center'
  },
  lapsTextItem: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Stopwatch;
