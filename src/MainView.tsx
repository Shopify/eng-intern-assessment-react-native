import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import StopWatch from "./StopWatch";
import StopWatchButton from "./StopWatchButton";
import formatTime from "./utils/format-time";
import AppContext from "./utils/AppContext";

export default function MainView() {
  const { laps } = React.useContext(AppContext);
  const displayLaps = () => {
    const displayedLaps = [];
    for (let i = 0; i < laps.length; i++) {
      displayedLaps.push(
        <View key={i} style={styles.lapContainer}>
          <Text>{"Lap " + (i + 1) + ": "}</Text>
          <Text>{formatTime(laps[i])}</Text>
        </View>
      );
    }
    return displayedLaps;
  };
  return (
    <View style={styles.mainViewContainer}>
      <StopWatch />
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
  },
});
