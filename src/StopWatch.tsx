import React from "react";
import { StyleSheet, Text, View } from "react-native";
import formatTime from "./utils/format-time";
import AppContext from "./utils/AppContext";

export default function StopWatch() {
  const { time } = React.useContext(AppContext);
  return (
    <View style={styles.timeContainer}>
      <Text style={styles.timeText}>{formatTime(time)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  timeContainer: {
    width: "100%",
    height: "40%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  timeText: {
    fontSize: 50,
    top: 40,
  },
});
