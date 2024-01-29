import { View, StyleSheet, ImageBackground, Text, Animated } from 'react-native';
import StopWatchButton from './StopWatchButton';
import { useState, useEffect, useRef } from 'react';


export default function StopWatch() {
  // initialize state variables
  const [play, setPlay] = useState(false);
  const [playCount, setPlayCount] = useState(0);
  const [timerValue, setTimerValue] = useState(0);
  const [intervalId, setIntervalId] = useState<number | undefined>(undefined);

  // handler function for play state
  const handlePlay = () => {
    setPlay((prevPlay) => {
      // Toggle play state only if the stopwatch is not paused
      if (prevPlay && timerValue > 0) {
        // Stop the stopwatch when play is paused
        stopTimer();
      } else if (!prevPlay) {
        // Start the stopwatch when play is pressed
        startTimer();
      }
      return !prevPlay;
    });
    // Increment play count
    setPlayCount((prevCount) => prevCount + 1);
  }
  

  // handler function for starting the stopwatch
  const startTimer = () => {
    const id = setInterval(() => {
      setTimerValue((prevValue) => prevValue + 1);
    }, 1000); // Increment every 1000 milliseconds
    setIntervalId(id);
  }

  // handler function for stopping the timer
  const stopTimer = () => {
    if (intervalId !== undefined) {
      clearInterval(intervalId);
      setIntervalId(undefined);
    }
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
      // Reset the timer animation when play is paused or stopped
      // animatedValue.setValue(0);
    }
  }, [play, intervalId]);

  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/mobile-background.png")}
    >
      <View >
        <Text style={styles.timerText}>{formatTime(timerValue)}</Text>
        <View style={styles.buttonContainer}>
          <StopWatchButton 
            imageName="reset"
            title="Reset"
            onPress={() => console.log('Stop Button')}
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