import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { INITIAL_TIMER_STATE, TimerState, formatTime } from "../data/TimerState";
import StopWatchButton, {
  StateMapping,
  StopButtonState,
  StopButtonType,
} from "./StopWatchButton";
import LapsView from "./LapsView";

const StopWatch = () => {
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
    const instTime = timerState;
    setLaps([formatTime(instTime), ...laps]);
  };

  function handleButtonClick(type: StopButtonType) {
    switch (type) {
      case StopButtonType.START:
        startClick();
        break;
      case StopButtonType.STOP:
        stopClick();
        break;
      case StopButtonType.RESET:
        resetClick();
        break;
      case StopButtonType.LAP:
        lapClick();
        break;
      default:
        break;
    }
  }

  return (
    <View style={styles.max_container}>
      <View style={styles.container}>
        <View>
          <Text style={styles.main_stopwatch_text}>
            {formatTime(timerState)}
          </Text>
        </View>
        <View style={styles.button_row}>
          <StopWatchButton
            type={StateMapping[stopwatchState].btnLeft}
            buttonClick={(type: StopButtonType) => {
              handleButtonClick(type);
            }}
          />
          <StopWatchButton
            type={StateMapping[stopwatchState].btnRight}
            buttonClick={(type: StopButtonType) => {
              handleButtonClick(type);
            }}
          />
        </View>
      </View>
      <View style={styles.container}>
        <LapsView timerInfo={timerState} lapData={laps} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  max_container: {
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  button_row: {
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    gap: 100,
    width: "100%",
  },
  main_stopwatch_text: {
    fontSize: 50,
    fontWeight: "bold",
    color: "black",
    width: "100%",
  },
});

export default StopWatch;
