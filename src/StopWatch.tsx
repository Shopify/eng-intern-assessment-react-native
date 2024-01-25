import { StyleSheet, Text, View } from "react-native";
import { convertMillisToClockTimeString } from "../util/TimeConverter";
import StopWatchButton from "./StopWatchButton";
import StopWatchLap from "./StopWatchLap";
import { useState, useEffect } from "react";

export default function StopWatch() {
  /*
   * states to keep track of the time elapsed, timer state,
   * and laps.
   */
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [lapTimes, setLapTimes] = useState<number[]>([]);
  const [previousLap, setPreviousLap] = useState(0);

  /*
   * running the timer
   */
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

  /*
   * functions to control the timer
   */
  const resetStopWatch = () => {
    setLapTimes([]);
    setElapsedTime(0);
    setIsTimerRunning(false);
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

  const pauseStopWatch = () => {
    setIsTimerRunning(false);
  };

  return (
    <>
      <View style={styles.mainClockContainer}>
        <Text style={styles.clockText}>
          {convertMillisToClockTimeString(elapsedTime)}
        </Text>
      </View>
      <View style={styles.buttonsContainer}>
        <StopWatchButton
          type="reset"
          onClick={resetStopWatch}
          isDisabled={elapsedTime == 0}
        />
        <StopWatchButton
          type={isTimerRunning ? "pause" : "start"}
          onClick={isTimerRunning ? pauseStopWatch : startStopWatch}
        />
        <StopWatchButton
          type="lap"
          onClick={lapStopWatch}
          isDisabled={!isTimerRunning}
        />
      </View>
      {lapTimes.length > 0 && <StopWatchLap allLaps={lapTimes} />}
    </>
  );
}

/*
 * basic styling
 */
const styles = StyleSheet.create({
  mainClockContainer: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  clockText: {
    fontSize: 48,
    fontVariant: ["tabular-nums"],
    color: "#fca311",
  },
  buttonsContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
