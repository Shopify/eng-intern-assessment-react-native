import React from "react";
import { Button, StyleSheet, View } from "react-native";
import AppContext from "./utils/AppContext";

export default function StopWatchButton() {
  let { time, setTime } = React.useContext(AppContext);
  const { setLaps } = React.useContext(AppContext);
  const timerId = React.useRef(0);
  const [started, setStarted] = React.useState(false);

  const start = () => {
    const timer = setInterval(() => {
      setTime((time: number) => {
        // 359999 is the maximum time that can be displayed
        if (time == 359999) {
          stop();
          return 0;
        }
        return time + 1;
      });
    }, 10);
    timerId.current = timer;
    setStarted(true);
  };
  const stop = () => {
    clearInterval(timerId.current);
    timerId.current = 0;
    setStarted(false);
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
    <View style={styles.buttonsContainer}>
      <View style={styles.buttonContainer}>
        <Button
          title={started ? "Stop" : "Start"}
          color={started ? "red" : "green"}
          onPress={started ? stop : start}
        ></Button>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Reset"
          disabled={time == 0}
          color={"grey"}
          onPress={reset}
        ></Button>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Lap" disabled={time == 0} onPress={lap}></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonsContainer: {
    width: "100%",
    height: "8%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  buttonContainer: {
    width: "20%",
    height: "100%",
  },
});
