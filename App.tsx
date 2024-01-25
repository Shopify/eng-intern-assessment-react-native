import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import StopWatch from "./src/StopWatch";
import { useEffect, useState } from "react";
import StopWatchButton from "./src/StopWatchButton";
import StopWatchLap from "./src/StopWatchLap";

export default function App() {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [lapTimes, setLapTimes] = useState<number[]>([]);
  const [previousLap, setPreviousLap] = useState(0);

  useEffect(() => {
    let interval: number;

    if (isTimerRunning) {
      interval = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 10);
      }, 10);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isTimerRunning]);

  const resetStopWatch = () => {
    setElapsedTime(0);
    setIsTimerRunning(false);
    setLapTimes([]);
    setPreviousLap(0);
  };

  const lapStopWatch = () => {
    const lapTime = elapsedTime - previousLap;
    setLapTimes((prev) => [lapTime, ...prev]);
    setPreviousLap(elapsedTime);
  };

  const startStopWatch = () => {
    setIsTimerRunning(true);
  };

  const stopStopWatch = () => {
    setIsTimerRunning(false);
  };

  return (
    <View style={styles.container}>
      <StopWatch milliseconds={elapsedTime}/>
      <View style={styles.buttonsContainer}>
        {!isTimerRunning ? (
          <>
            <StopWatchButton  type="reset" onClick={resetStopWatch} isDisabled={elapsedTime == 0}/>
            <StopWatchButton type="start" onClick={startStopWatch} />
          </>
        ) : (
          <>
            <StopWatchButton type="lap" onClick={lapStopWatch} />
            <StopWatchButton type="stop" onClick={stopStopWatch} />
          </>
        )}
      </View>
      <StopWatchLap latestLap={elapsedTime - previousLap} allLaps={lapTimes}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonsContainer: {
    flex: 1,
    width: "100%",
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});
