import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import StopWatch from "./src/StopWatch";
import StopWatchButton, {
  StateMapping,
  StopButtonState,
  StopButtonType,
} from "./src/StopWatchButton";
import { useState } from "react";
import React from "react";
import LapsView from "./src/LapsView";
import { INITIAL_TIMER_STATE, formatTime } from "./src/TimerState";

export default function App() {
  const [stopwatchState, setStopwatchState] = useState(StopButtonState.INITIAL);
  const [timerState, setTimerState] = useState(INITIAL_TIMER_STATE);
  const [timerIntervalID, setTimerIntervalID] = useState(0);
  const [laps, setLaps] = useState<string[]>([]);

  const startClick = () => {
    setStopwatchState(StopButtonState.PLAYING);
    const now: number = new Date().getTime();
    let elapsedTime = timerState.currTime - timerState.startTime;

    setTimerState({ startTime: now, currTime: now });
    let intervalID = setInterval(() => {
      setTimerState({
        startTime: now,
        currTime: new Date().getTime() + elapsedTime,
      });
    }, 10);
    setTimerIntervalID(intervalID);
  };

  const stopClick = () => {
    setStopwatchState(StopButtonState.PAUSED);
    clearInterval(timerIntervalID);
    const inst = timerState;
    setTimerState(inst);
  };

  const resetClick = () => {
    setStopwatchState(StopButtonState.INITIAL);
    setTimerState(INITIAL_TIMER_STATE);
    clearInterval(timerIntervalID);
    setLaps([]);
  };

  const lapClick = () => {
    const instTime = timerState
    setLaps([formatTime(instTime), ...laps]);
  };

  function handleButtonClick(type: StopButtonType) {
    switch (type) {
      case StopButtonType.START: startClick(); break;
      case StopButtonType.STOP: stopClick(); break;
      case StopButtonType.RESET: resetClick(); break;
      case StopButtonType.LAP: lapClick(); break;
      default: break;
    }
  }

  return (
    <View style={styles.container}>

      <View style={styles.half}>
        {StopWatch(timerState)}
        <View style={styles.buttonRow}>
          {StopWatchButton(
            StateMapping[stopwatchState].btnLeft,
            (type: StopButtonType) => {
              handleButtonClick(type);
            }
          )}
          {StopWatchButton(
            StateMapping[stopwatchState].btnRight,
            (type: StopButtonType) => {
              handleButtonClick(type);
            }
          )}
        </View>
      </View>
      <View style={styles.half}>{LapsView(timerState, laps)}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  half: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  buttonRow: {
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    gap: 100,
    width: "100%",
  },
});
