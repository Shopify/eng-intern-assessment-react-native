import React from "react";
import { Button, StyleSheet, View } from "react-native";

export default function StopWatchButton(props: any) {
  // Used to switch between start and stop
  const [started, setStarted] = React.useState(false);
  // Used to clear the interval
  const timerId = React.useRef(0);

  const startTimer = () => {
    const timer = setInterval(() => {
      // A callback inside setTime has to be used to access the correct time as we are using a setInterval
      props.setTime((time: number) => {
        // 359999 is the maximum time that can be displayed (59:59:99)
        if (time == 359999) {
          stopTimer();
          return 0;
        }
        return time + 1;
      });
    }, 10);
    timerId.current = timer;
    setStarted(true);
  };

  const stopTimer = () => {
    clearInterval(timerId.current);
    timerId.current = 0;
    setStarted(false);
  };

  const resetTimer = () => {
    if (timerId.current) {
      stopTimer();
    }
    props.setTime(0);
    props.setLaps([]);
  };

  const addLap = () => {
    props.setLaps([...props.laps, props.time]);
  };

  return (
    <View style={styles.buttonsContainer}>
      <View style={styles.buttonContainer}>
        <Button
          title={started ? "Stop" : "Start"}
          color={started ? "red" : "green"}
          onPress={started ? stopTimer : startTimer}
        ></Button>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Reset"
          disabled={props.time == 0}
          color={"grey"}
          onPress={resetTimer}
        ></Button>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Lap"
          disabled={props.time == 0}
          onPress={addLap}
        ></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonsContainer: {
    width: "100%",

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
