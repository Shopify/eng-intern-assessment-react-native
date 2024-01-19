import React from "react";
import { StyleSheet, View } from "react-native";
import LapDisplay from "./LapDisplay";
import StopWatch from "./StopWatch";

export default function MainView() {
  const [laps, setLaps] = React.useState([]);
  return (
    <View style={styles.mainViewContainer}>
      <StopWatch laps={laps} setLaps={setLaps} />
      <LapDisplay laps={laps} />
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
});
