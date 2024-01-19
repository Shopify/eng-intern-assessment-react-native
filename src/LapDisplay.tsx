import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import formatTime from "./utils/FormatTime";

export default function LapDisplay(props: any) {
  const displayLaps = () => {
    const displayedLaps = [];
    console.log("laps");
    for (let i = 0; i < props.laps.length; i++) {
      displayedLaps.push(
        <View key={i} style={styles.lapContainer}>
          <Text style={[styles.lapText, { marginLeft: 10, textAlign: "left" }]}>
            {"Lap " + (i + 1) + ": "}
          </Text>
          <Text
            style={[styles.lapText, { marginRight: 10, textAlign: "right" }]}
          >
            {formatTime(props.laps[i])}
          </Text>
        </View>
      );
    }
    return displayedLaps.reverse();
  };

  return (
    <ScrollView contentContainerStyle={styles.lapsContainer}>
      {displayLaps()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
    width: "40%",
    fontSize: 20,
  },
});
