import { View, StyleSheet, ImageBackground, Text, Animated, FlatList, ScrollView } from 'react-native';
import StopWatchButton from './StopWatchButton';
import { useState, useEffect, useRef } from 'react';


export default function StopWatch() {
  // initialize state variables
  const [play, setPlay] = useState(false);
  const [playCount, setPlayCount] = useState(0);
  const [stopWatchValue, setStopWatchValue] = useState(0);
  const [intervalId, setIntervalId] = useState<number | undefined>(undefined);
  const [lapsRecorded, setLapsRecorded] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const lastLapTimestamp = useRef<number | null>(null);

  // handler function for play state
  const handlePlay = () => {
    setPlay((prevPlay) => {
      // Toggle play state only if the stopwatch is not paused
      if (prevPlay && stopWatchValue > 0) {
        // Stop the stopwatch when play is paused
        stopStopWatch();
      } else if (!prevPlay) {
        // Start the stopwatch when play is pressed
        startStopWatch();
      }
      return !prevPlay;
    });
    // Increment play count
    setPlayCount((prevCount) => prevCount + 1);
  }

  // handler function for resetting
  const handleReset = () => {
    // Reset the stopwatch
    resetStopWatch();
  }
  // handler function for recording the lap
  const handleLap = () => {
    // Record the lpa
    recordLap();
  }

  // helper function for starting the stopwatch
  const startStopWatch = () => {
    const id = setInterval(() => {
      setStopWatchValue((prevValue) => prevValue + 1);
    }, 1000); // Increment every 1000 milliseconds

    // Clear the previous interval if it exists
    if (intervalId !== undefined) {
      clearInterval(intervalId);
    }

    setIntervalId(id);
  }

  // helper function for stopping the stopwatch
  const stopStopWatch = () => {
    if (intervalId !== undefined) {
      clearInterval(intervalId);
      setIntervalId(undefined);
    }
  }

  // helper function for resetting the stopwatch
  const resetStopWatch = () => {
    //reset the stop watch value
    setStopWatchValue(0);
    // reset the laps recorded
    setLaps([]);
    lastLapTimestamp.current = null;
    setLapsRecorded(false);
    // reset the other states
    if (intervalId !== undefined) {
      clearInterval(intervalId);
      setIntervalId(undefined);
    }
    setPlay(false);
  }

  // helper function for recording a lap
  const recordLap = () => {
    if (lastLapTimestamp.current !== null) {
      // Calculate the time difference between the current lap and the previous lap
      const lapTime = stopWatchValue - lastLapTimestamp.current;
      // append to the list of laps
      setLaps((prevLaps) => [...prevLaps, lapTime]);
    } else {
      // If it's the first lap, calculate the time difference between the current lap and the start
      const lapTime = stopWatchValue;
      setLaps((prevLaps) => [...prevLaps, lapTime]);
      setLapsRecorded(true);
    }
    // Update the last lap timestamp
    lastLapTimestamp.current = stopWatchValue;
  }

  const renderLapItem = ({ item, index }: { item: number; index: number }) => (
    <View style={styles.lapItem}>
      <Text style={styles.lapItemText}>Lap {index + 1}</Text>
      <Text testID="lap-item" style={styles.lapItemText}>{formatTime(item)}</Text>
    </View>
  );

  // Helper function for formatting time in HH:MM:SS
  const formatTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    const formatNumber = (num: number) => (num < 10 ? `0${num}` : `${num}`);

    return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}`;
  };

  useEffect(() => {
    if (!play && intervalId !== undefined) {
      // Stop the timer animation when play is paused or stopped
      clearInterval(intervalId);
      setIntervalId(undefined);
    }

    // Cleanup function to clear interval when component is unmounted
    return () => {
      if (intervalId !== undefined) {
        clearInterval(intervalId);
      }
    };
  }, [play, intervalId]);

  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/mobile-background.png")}
    >
      <View style={styles.container}>
        <Text testID="timer-text" style={styles.timerText}>{formatTime(stopWatchValue)}</Text>
        {lapsRecorded &&
          <View style={styles.scrollView}>
            <FlatList
              testID="lap-list"
              data={laps}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderLapItem}
              ListHeaderComponent={() => (
                <View style={styles.lapHeader}>
                  <Text style={styles.lapHeaderText}>Laps</Text>
                </View>
              )}
            />
          </View>
        }
        <View style={styles.buttonContainer}>
          <StopWatchButton 
            imageName="reset"
            title="Reset"
            onPress={handleReset}
          />
          <StopWatchButton 
            imageName="play"
            title="Start"
            play={play}
            playCount={playCount}
            onPress={handlePlay}
          />
          <StopWatchButton 
            imageName="lap"
            title="Lap"
            onPress={handleLap}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '40%',
  },
  background: {
      flex: 1,
      justifyContent: "flex-end",
      width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row', // Arrange items horizontally
    justifyContent: 'space-around', // Add space between items
    paddingHorizontal: 16, // Add some horizontal padding
    position: 'absolute',
    bottom: '20%', // Stick to the bottom of the screen
    width: '100%', // Take the full width
    height: 80,
  },
  timerText: {
    fontSize: 70,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: 'white',
  },
  lapItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    fontSize: 15,
  },
  lapItemText: {
    fontSize: 20,
    color: 'white',
  },
  lapHeader: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#f0f0f0',
  },
  lapHeaderText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  scrollView: {
    flex: 1,
    marginBottom: '70%',
  },
})