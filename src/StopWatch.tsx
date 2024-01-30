import React, { useState, useRef, useCallback } from "react";
import { StyleSheet, SafeAreaView, Text, View, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import Result from "../core/Result";
import StopWatchButton from "./StopWatchButton";
import { displayTime } from "../core/util";
import StopwatchHeading from "../core/Header";
import { SafeAreaProvider } from "react-native-safe-area-context";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: Constants.statusBarHeight,
  },
  display: {
    flex: 3 / 5,
    justifyContent: "center",
    alignItems: "center",
  },
  displayText: {
    color: "#fff",
    fontSize: 70,
    fontWeight: "200",
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "",
  },

  control: {
    height: 70,
    flexDirection: "row",
    justifyContent: "space-around",
  },

  results: {
    flex: 2 / 5,
  },
});

export default function StopWatch() {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setRunning] = useState<boolean>(false);
  const [results, setResults] = useState<number[]>([]);
  const timerRef = useRef<NodeJS.Timeout>();

  const handleLeftButtonPress = useCallback(() => {
    if (isRunning) {
      setResults((previousResults) => [time, ...previousResults]);
    } else {
      setResults([]);
      setTime(0);
    }
  }, [isRunning, time]);
  const handleRightButtonPress = useCallback(() => {
    if (!isRunning) {
      const interval = setInterval(() => {
        setTime((previousTime) => previousTime + 1);
      }, 10);

      timerRef.current = interval;
    } else {
      clearInterval(timerRef.current);
    }

    setRunning((previousState: boolean) => !previousState);
  }, [isRunning]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StopwatchHeading />
        <StatusBar />
        <View style={styles.display}>
          <Text style={{ color: "white", fontSize: 20 }}>
            {displayTime(time)}
          </Text>
        </View>

        <View style={styles.control}>
          <StopWatchButton
            isRunning={isRunning}
            handleLeftButtonPress={handleLeftButtonPress}
            handleRightButtonPress={handleRightButtonPress}
          />
        </View>

        <View testID="la" style={styles.results}>
          <Result results={results}></Result>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
