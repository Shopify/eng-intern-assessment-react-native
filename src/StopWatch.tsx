<<<<<<< HEAD
import { View } from 'react-native';

export default function StopWatch() {
  return (
    <View >
    </View>
  );
}
=======
import React, { useState, useEffect, useRef } from 'react';
import { View, SafeAreaView, StyleSheet, Text, ScrollView } from 'react-native';
import StopWatchButton from './StopWatchButton';
import { formatTime } from './utils/timeUtil';

export default function StopWatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setRunning] = useState(false);
  const [started, setStarted] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const [showTime, setShowtime] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if(isRunning){
      // Update interval every 1000 milliseconds or 1 second.
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 1)
      }, 1000);
    }
    else if(intervalRef.current){
      clearInterval(intervalRef.current);
    }
    return () => {
      if(intervalRef.current) clearInterval(intervalRef.current);
    }
  }, [isRunning]);

  // Reset the time to zero and laps
  const reset = () => {
    setStarted(false);
    setRunning(false);
    setTime(0);
    setLaps([]);
  };

  // Same as reset except we don't show the time
  const stop = () => {
    setStarted(false);
    setShowtime(false);
    setRunning(false);
    setTime(-1);
    setLaps([]);
  };

  // Pause the timer
  const pause = () => {
    setRunning(false);
  };

  // Resume the timer
  const resume = () => {
    setRunning(true);
    if(!started){
      setStarted(true);
    }
    setShowtime(true);
  }

  // When lap button is pressed, adds the current lap
  const lapPress = () => {
    setLaps([...laps, time]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <Text style={styles.title}>Stopwatch</Text>
        <View style={styles.timerContainer}>
          <Text style={styles.timerDisplay}>
            {time == -1 ? "" : formatTime(time)}
          </Text>
        </View>
        <View style={{flexDirection: "row", justifyContent: "space-around", marginTop: 30, marginBottom: 10, flexWrap: "wrap"}}>
          <StopWatchButton 
            name={"Reset"} 
            onClick={reset} 
            color="red"
            isDisabled={!started}/>
          <StopWatchButton 
            name={isRunning ? "Pause" : "Resume"}
            onClick={isRunning ? pause : resume}
            color={isRunning ? "red" : "lightgreen"}  // Different Color based on which options it is
            isDisabled={false}/>
          <StopWatchButton 
            name={"Lap"}
            onClick={lapPress} 
            color="lightblue"
            isDisabled={!isRunning}/>
          <StopWatchButton 
            name={"Stop"}
            onClick={stop} 
            color={started ? "red" : "darkgrey"}  // Grayed out when it is unavailable
            isDisabled={!started}/>
        </View>
      </View>
      <ScrollView testID='lap-list' style={styles.lapContainer}>
        {laps.map((lap, index) => (
          <View key={index} style={styles.lapRow}>
            <Text style={styles.lapText}>{index + 1}</Text>
            <Text style={styles.lapText}>{formatTime(lap)}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: 'center'
  },
  buttonContainer: {
    justifyContent: "center",
    alignContent: "center"
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center"
  },
  lapContainer: {
    width: "90%",
    alignContent: "center"
  },
  lapText: {
    fontSize: 18,
    marginHorizontal: 10,
    textAlign: "center"
  },
  lapRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  timerContainer: {
    flex: 0.6,
    margin: 0
  },
  timerDisplay: {
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center"
  }
});
>>>>>>> bfc9246 (Finally Done!)
