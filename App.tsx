import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native'; 
import React,{useState}from 'react';
import Stopwatch from './src/StopWatch'; 
import StopwatchButton from './src/StopWatchButton';

//app.tsx used for functionality  


//main component 
export default function App() {
  //state variables for tracking stopwatch status and elapsed seconds
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0); 
  //func to start
  const handleStart = () => {
    setIsRunning(true);
  };
  //func to stop
  const handleStop = () => {
    setIsRunning(false);
  };
  //func to reset 
  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0); 
  };

  return (
    //renders the stopwatch within a view container
    //renders with current elapsed seconds and running status
    //renders the StopwatchButton component with controls for starting, stopping, and resetting the stopwatch
    <View style={styles.container}>
        <Stopwatch seconds={seconds} isRunning={isRunning} />
      <StopwatchButton isRunning={isRunning} onStart={handleStart} onStop={handleStop} onReset={handleReset} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //fills the entire space on screen
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});