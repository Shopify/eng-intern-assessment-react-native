import { View, StyleSheet, ImageBackground, Text, Animated } from 'react-native';
import StopWatchButton from './StopWatchButton';
import { useState, useEffect, useRef } from 'react';


export default function StopWatch() {
  // initialize state variables
  const [play, setPlay] = useState(false);
  const [playCount, setPlayCount] = useState(0);
  const [stopWatchValue, setStopWatchValue] = useState(0);
  const [intervalId, setIntervalId] = useState<number | undefined>(undefined);

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
  

  // handler function for starting the stopwatch
  const startStopWatch = () => {
    const id = setInterval(() => {
      setStopWatchValue((prevValue) => prevValue + 1);
    }, 1000); // Increment every 1000 milliseconds
    setIntervalId(id);
  }

  // handler function for stopping the stopwatch
  const stopStopWatch = () => {
    if (intervalId !== undefined) {
      clearInterval(intervalId);
      setIntervalId(undefined);
    }
  }

  // handler function for resetting the stopwatch
  const resetStopWatch = () => {
    //reset the stop watch value
    setStopWatchValue(0);
    // reset the other states
    if (intervalId !== undefined) {
      clearInterval(intervalId);
      setIntervalId(undefined);
    }
    setPlay(false);
  }

  // Format time in HH:MM:SS
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
  }, [play, intervalId]);

  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/mobile-background.png")}
    >
      <View >
        <Text style={styles.timerText}>{formatTime(stopWatchValue)}</Text>
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
            onPress={() => console.log('Stop Button')}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
      flex: 1,
      justifyContent: "flex-end",
      width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row', // Arrange items horizontally
    justifyContent: 'space-around', // Add space between items
    paddingHorizontal: 16, // Add some horizontal padding
    marginBottom: '30%', // Add some marginBottom if needed
  },
  timerText: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    marginBottom: '110%',
    color: 'white',
  },
})