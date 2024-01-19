import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import StopWatch from "./src/StopWatch";
import StopWatchButton from "./src/StopWatchButton";
import MainView from "./src/MainView";
import AppContext from "./src/utils/AppContext";

export default function App() {
  const [time, setTime] = React.useState(0);
  const [laps, setLaps] = React.useState([]);
  return (
    <AppContext.Provider
      value={{
        time,
        setTime,
        laps,
        setLaps,
      }}
    >
      <View style={styles.container}>
        <MainView />
      </View>
    </AppContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
});
