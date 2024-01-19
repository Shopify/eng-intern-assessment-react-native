import React from "react";
import { StyleSheet, Text, View } from "react-native";
import formatTime from "./utils/FormatTime";
import StopWatchButton from "./StopWatchButton";

export default function StopWatch(props: any) {
  const [time, setTime] = React.useState(0);

  return (
    <View style={styles.stopwatchContainer}>
      <Text style={styles.title}>It's About Time</Text>
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{formatTime(time)}</Text>
      </View>
      <StopWatchButton
        time={time}
        setTime={setTime}
        laps={props.laps}
        setLaps={props.setLaps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  stopwatchContainer: {
    width: "100%",
    height: "70%",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    top: 50,
  },
  timeContainer: {
    width: "100%",
    height: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  timeText: {
    fontSize: 50,
    top: 10,
  },
});
