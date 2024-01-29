import { View, Button, StyleSheet, Text, ScrollView } from "react-native";
import React, { useState, useRef } from "react";

type Props = {
  setTimeInSeconds: Function;
};

export default function StopWatchButton(props: Props) {
  const { setTimeInSeconds } = props;
  const [intervalId, setIntervalId] = useState<number>(0);
  const [startButton, setStartButton] = useState<string>("Start");
  const [laps, setLaps] = useState<number[]>([]);
  const [lapTimes, setLapTimes] = useState<string[]>([]); // store lap times as strings
  const startTimeRef = useRef<number>(0); // creates ref to store start time
  const lapStartTimeRef = useRef<number[]>([]);
  const [timerStarted, setTimerStarted] = useState<boolean>(false);

  const handleStartButton = () => {
    const interval: any = setInterval(() => {
      setTimeInSeconds((previousState: number) => previousState + 1);
    }, 1000);

    setIntervalId(interval);
    startTimeRef.current = Date.now(); // save current time as start time
    lapStartTimeRef.current.push(startTimeRef.current); // stores the start time for each lap

    setTimerStarted(true);
  };

  const handleStopButton = () => {
    clearInterval(intervalId);
    setStartButton("Resume");
    const elapsedTime = Math.floor((Date.now() - startTimeRef.current) / 1000);
    setTimeInSeconds((previousState: number) => previousState + elapsedTime);
  };

  const handleResetButton = () => {
    clearInterval(intervalId);
    setTimeInSeconds(0);
    setStartButton("Start");
    setLaps([]);
    setLapTimes([]);

    setTimerStarted(false);

    lapStartTimeRef.current = [];
  };

  const handleLapButton = () => {
    const lapStartTimes = lapStartTimeRef.current;
    const lapsCount = laps.length;

    if (lapStartTimes.length > lapsCount) {
      const lapTime = Math.floor(
        (Date.now() - lapStartTimeRef.current[lapsCount]) / 1000
      );
      setLaps((prevLaps) => [...prevLaps, lapTime]);

      const formattedLapTime = formatTime(lapTime);
      setLapTimes((prevLapTimes) => [...prevLapTimes, formattedLapTime]);
    }
  };

  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <View>
      <View style={styles.buttons}>
        <Button
          onPress={handleStartButton}
          title={startButton}
          color="black"
        ></Button>
      </View>
      <View style={styles.buttons}>
        <Button
          onPress={handleStopButton}
          title="Stop"
          color="black"
          disabled={!timerStarted}
        ></Button>
      </View>
      <View style={styles.buttons}>
        <Button
          onPress={handleResetButton}
          title="Reset"
          color="black"
          disabled={!timerStarted}
        ></Button>
      </View>
      <View style={styles.buttons}>
        <Button
          onPress={handleLapButton}
          title="Lap"
          color="black"
          disabled={!timerStarted}
        ></Button>
      </View>
      <Text>Lap Times:</Text>
      <View style={styles.scrollView}>
        <ScrollView>
          {lapTimes.map((lapTime, index) => (
            <Text key={index}>{`Lap ${index + 1}: ${lapTime}`}</Text>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttons: {
    backgroundColor: "#84EF9E",
    margin: 8,
    width: 100,
  },
  scrollView: {
    height: 400,
    alignItems: "center",
    justifyContent: "center",
  },
});
