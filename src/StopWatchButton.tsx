import React from "react";
import { Button, StyleSheet, View } from "react-native";
import AppContext from "./utils/AppContext";

export default function StopWatchButton() {
  let { time, setTime } = React.useContext(AppContext);
  const { setLaps } = React.useContext(AppContext);
  const timerId = React.useRef(0);

  const start = () => {
    if (timerId.current) {
      return;
    }
    const timer = setInterval(() => {
      setTime((time: number) => time + 1);
    }, 10);
    timerId.current = timer;
  };
  const stop = () => {
    clearInterval(timerId.current);
    timerId.current = 0;
  };
  const reset = () => {
    if (timerId.current) {
      stop();
    }
    setTime(0);
    setLaps([]);
  };
  const lap = () => {
    setLaps((laps: any) => [...laps, time]);
  };
  return (
    <View style={styles.buttonContainer}>
      <Button title="Start" onPress={start}></Button>
      <Button title="Stop" onPress={stop}></Button>
      <Button title="Reset" onPress={reset}></Button>
      <Button title="Lap" onPress={lap}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: "60%",
    height: "20%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
