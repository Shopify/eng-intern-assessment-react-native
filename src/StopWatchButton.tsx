import { View, Button, StyleSheet, Text, ScrollView } from "react-native";
import React, { useState, useRef } from "react";

type Props = {
  setTimeInSeconds: Function;
};

export default function StopWatchButton(props: Props) {
  const { setTimeInSeconds } = props;
  const [intervalId, setIntervalId] = useState<number>(0);
  const [startButton, setStartButton] = useState<string>("Start"); // tracks when to display "Start" vs "Resume"
  const [stopButton, setStopButton] = useState<string>("Stop"); // tracks when to display "Stop" vs "Pause"
  const [lapTimes, setLapTimes] = useState<string[]>([]); // store lap times as strings
  const startTimeRef = useRef<number>(0); // creates ref to store start time
  const [timerStarted, setTimerStarted] = useState<boolean>(false); // tracks if timer started, if not disable the other buttons
  const [lapStarted, setlapStarted] = useState<boolean>(false); // tracks if timer started, if not disable the other buttons

  const handleStartButton = () => {
    const interval: any = setInterval(() => {
      setTimeInSeconds((previousState: number) => previousState + 1);
    }, 1000); // start counting

    setIntervalId(interval);

    if (!timerStarted) {
      // if timer already started, don't reset the initial start time
      startTimeRef.current = Date.now(); // save current time as start time
    }

    setTimerStarted(true); // did we start the timer? yes
    setStopButton("Pause"); // change "stop" to "pause"
  };

  const handleStopButton = () => {
    clearInterval(intervalId); // pause the timer
    setStartButton("Resume"); // change "Start" to "Resume"
  };

  const handleLapButton = () => {
    // Math.floor() rounds the number down
    const lapTime = Math.floor((Date.now() - startTimeRef.current) / 1000); // current time minus start time = duration of this lap
    const formattedLapTime = formatTime(lapTime); // reformats time to 00:00:00
    setLapTimes((prevLapTimes) => [...prevLapTimes, formattedLapTime]); // add to array

    startTimeRef.current = Date.now(); // new start time = time when lap button was pressed
    setlapStarted(true);
  };

  const handleResetButton = () => {
    clearInterval(intervalId); // resets the timer to 00:00:00
    setTimeInSeconds(0);
    setStartButton("Start"); // change "resume" to "start"
    setStopButton("Stop"); // change "pause" to "stop"
    setLapTimes([]); // reset laps

    // reset
    setTimerStarted(false);
    setlapStarted(false);
  };

  // function reformats the time into 00:00:00
  const formatTime = (timeInSeconds: number): string => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  // Start/Resume, Stop/Pause, Lap, Reset Buttons
  return (
    <View>
      <View style={styles.buttons}>
        <Button
          onPress={handleStartButton}
          title={startButton}
          color="black"
          disabled={lapStarted}
        ></Button>
      </View>
      <View style={styles.buttons}>
        <Button
          onPress={handleStopButton}
          title={stopButton}
          color="black"
          disabled={!timerStarted || lapStarted}
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
      <View style={styles.textContainer}>
        <Text lap-list>Lap Times:</Text>
      </View>
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
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
  },
  scrollView: {
    height: 400,
    alignItems: "center",
    justifyContent: "center",
  },
});
