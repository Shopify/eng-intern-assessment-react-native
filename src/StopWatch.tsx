import { View, Text, StyleSheet } from 'react-native';
import StopWatchButton from "./StopWatchButton";
import { useState, useRef } from "react";
import formatTime from "./util/FormatTime";
import Laps from './Laps';

const StopWatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [timePassed, setTimePassed] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const [lapTimes, setLapTimes] = useState<number []>([]);

  const startStopWatch = () => {
    if (isRunning) {
      clearInterval(intervalRef.current!);
  }
  else {
    setIsRunning(true);
    const startTime = Date.now() - timePassed;
    intervalRef.current = setInterval(() => {
      setTimePassed(Date.now() - startTime);
    }, 100);
  }

  setIsRunning(!isRunning);

  };

  const resetStopWatch = () => {
    clearInterval(intervalRef.current!);
    setIsRunning(false);
    setTimePassed(0);
    setLapTimes([]);
  };

  const stopStopWatch = () => {
    if (isRunning) {
      clearInterval(intervalRef.current!);
      setIsRunning(false);
  };
  };

  const newLap = () => {
    if (isRunning){
      setLapTimes((prevLapTimes) => [... prevLapTimes, timePassed])
    };
  };

  return (
    <View>
      <Text style={styles.timer}>{formatTime(timePassed)}</Text>
      <View style={styles.startResetContainer}>
      <StopWatchButton
      title={isRunning ? "Stop": "Start"}
      onPress={isRunning ? stopStopWatch : startStopWatch}
      buttonStyles={isRunning ? styles.stopButton: styles.startButton}
      />

      <StopWatchButton
      title={"Reset"}
      onPress={resetStopWatch}
      buttonStyles={styles.resetButton}
      />
      </View>
      <StopWatchButton
      title={"Lap"}
      onPress={newLap}
      buttonStyles={styles.lapButton}
      />
      <Text style={styles.lapsLabel}>Laps</Text>
      <Laps lapTimes={lapTimes} />
    </View>
  )
};


const styles = StyleSheet.create({

  timer: {
    fontSize: 20,
  },

  lapsLabel: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "left"
  },

  startButton: {
    paddingHorizontal: 50,
    paddingVertical: 20,
    borderRadius: 20,
    backgroundColor: "green",
    textAlign: "center"
  },

  startResetContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  resetButton: {
    paddingHorizontal: 50,
    paddingVertical: 20,
    borderRadius: 20,
    backgroundColor: "grey",
    textAlign: "center"
  },

  stopButton: {
    paddingHorizontal: 50,
    paddingVertical: 20,
    borderRadius: 20,
    backgroundColor: "red",
    textAlign: "center"
  },

  lapButton: {
    paddingHorizontal: 100,
    paddingVertical: 20,
    borderRadius: 20,
    backgroundColor: "orange",
    textAlign: "center"
  }

})

export default StopWatch;