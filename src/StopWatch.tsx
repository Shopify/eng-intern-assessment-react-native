import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import formatTime from "./utils/format-time";
import AppContext from "./utils/AppContext";
import StopWatchButton from "./StopWatchButton";

export default function StopWatch() {
  const { time } = React.useContext(AppContext);
  const { laps } = React.useContext(AppContext);
  const displayLaps = () => {
    const displayedLaps = [];
    for (let i = 0; i < laps.length; i++) {
      displayedLaps.push(
        <View key={i} style={styles.lapContainer}>
          <Text style={styles.lapText}>{"Lap " + (i + 1) + ": "}</Text>
          <Text style={styles.lapText}>{formatTime(laps[i])}</Text>
        </View>
      );
    }
    return displayedLaps;
  };
  return (
    <View style={styles.mainViewContainer}>
      <Text style={styles.title}>It's About Time</Text>
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{formatTime(time)}</Text>
      </View>
      <StopWatchButton />
      <ScrollView contentContainerStyle={styles.lapsContainer}>
        {displayLaps()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainViewContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    top: 50,
  },
  lapsContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  lapContainer: {
    width: "100%",
    height: 40,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor: "#fff",
  },
  lapText: {
    fontSize: 20,
    marginLeft: 10,
    marginRight: 10,
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
    top: 30,
  },
});
