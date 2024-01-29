import { View, Button, StyleSheet, Text, ScrollView } from "react-native";
import React, { useState, useRef } from "react";

type Props = {
  setTimeInSeconds: Function;
};

export default function StopWatchButton(props: Props) {
  const { setTimeInSeconds } = props;
  const [intervalId, setIntervalId] = useState<number>(0);
  const [laps, setLaps] = useState<number[]>([]);
  const startTimeRef = useRef<number>(0);

  const handlePlayButton = () => {
    const interval: any = setInterval(() => {
      setTimeInSeconds((previousState: number) => previousState + 1);
    }, 1000);

    setIntervalId(interval);
    startTimeRef.current = Date.now();
  };

  const handleStopButton = () => {
    clearInterval(intervalId);
    const elapsedTime = Math.floor((Date.now() - startTimeRef.current) / 1000);
    setTimeInSeconds((previousState: number) => previousState + elapsedTime);
  };

  const handleResetButton = () => {
    clearInterval(intervalId);
    setTimeInSeconds(0);
    setLaps([]);
  };

  const handleLapButton = () => {
    clearInterval(intervalId);
    const lapTime = Math.floor((Date.now() - startTimeRef.current) / 1000);
    setLaps((prevLaps) => [...prevLaps, lapTime]);
    startTimeRef.current = Date.now();
  };

  return (
    <View>
      <View style={styles.buttons}>
        <Button onPress={handlePlayButton} title="Play" color="black"></Button>
      </View>
      <View style={styles.buttons}>
        <Button onPress={handleStopButton} title="Stop" color="black"></Button>
      </View>
      <View style={styles.buttons}>
        <Button
          onPress={handleResetButton}
          title="Reset"
          color="black"
        ></Button>
      </View>
      <View style={styles.buttons}>
        <Button onPress={handleLapButton} title="Lap" color="black"></Button>
      </View>
      {/* <ScrollView>
        <Text>Lap Times: {laps.join(", ")}</Text>
      </ScrollView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  buttons: {
    backgroundColor: "#84EF9E",
    margin: 8,
    width: 100,
  },
});
