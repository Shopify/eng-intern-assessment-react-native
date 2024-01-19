import React from "react";
import { StyleSheet, Text, View } from "react-native";
import StopWatch from "./src/StopWatch";
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
        <StopWatch />
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
