import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import Stopwatch from './src/StopWatch';
import StopwatchButton from './src/StopWatchButton';
//app.tsx used for functionality  

//main component 

//state variables for tracking stopwatch status and elapsed seconds
export default function App() { 
  //checks if the stopwatch is running or not
  const [isRunning, setIsRunning] = useState(false); 
  //tracks the elapsed time
  const [seconds, setSeconds] = useState(0); 
  //tracks the recorded laps  
  //defines the laps, and setter function, initalizes empty array of numbers to track the number of laps in the stopwatch 
  //usestate - a hook, used to create a vairable and a setter function 
  const [laps, setLaps] = useState<number[]>([]); 
  //tracks lapped time 
  const [lapTime, setLapTime] = useState(0);

  //declares a variable to hold the reference to the interval
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    //checks if the stopwatch is running
    if (isRunning) {
      //if running - set interval to +1 every second 
      //1000 milliseconds is one second 
      intervalId = setInterval(() => {
        setLapTime(prevLapTime => prevLapTime + 1); 
      }, 1000);
    } else {
      //if not running, clear the interval
      clearInterval(intervalId); 
    }
    //function to clear the interval if the componentisrunning changes
    return () => clearInterval(intervalId); }, [isRunning]);

  //function for starting hte stop watch
  const handleStart = () => {
    setIsRunning(true);
  };
  //function for stopping the stopwatch
  const handleStop = () => {
    setIsRunning(false);
  };

  //function for resettin gthe stopwtch
  const handleReset = () => {
    //elasedseconds to 0
    setSeconds(0);
    //laptime to 0 
    setLapTime(0); 
    //is running to false to stop the stopwatch
    setIsRunning(false);
    //clear recorded laps
    setLaps([]);
  };

  //handles recording a lap
  const handleLap = () => {
    //adds current lap time to the array of lap times whether the user has pressed lap or not 
    setLaps(prevLaps => [...prevLaps, lapTime]);
  };

  //below returns 
    //stopwatch component which displays the current lap time 
    //componenet for controlling the stopwatches - start, stop, reset, lap 
    //container for displaying recorded laps 
    //component for statusBar 
  return (
//in order
    //render the stopwatch 
    //render the stopwatch componenet 
    //conrainer for recorded laps 
          //maps over the laps array to display EACH RECORDED Lap 
    //displays the lap index in formatted time layout 
          //ex: lap 1, lap2, + the time format 00:00:00 
    //statusbar auto - allwos stausbar to pickrandomly/automatically for dark/light mode/other color related schemas 
    <View style={styles.container}> 
      <Stopwatch
        isRunning={isRunning}
        lapTime={lapTime}
      />
      <StopwatchButton
        isRunning={isRunning}
        onStart={handleStart}
        onStop={handleStop}
        onReset={handleReset}
        onLap={handleLap}
      />
      <View style={styles.lapsContainer}>
        {laps.map((lap, index) => (
          <Text key={index} style={styles.lapText}>
            Lap {index + 1}: {formatTime(lap)}
          </Text>
        ))}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

//function for formatting mins, secs, millisecs
const formatTime = (time: number): string => { 
  //divides time by 60 and rounds down
  const minutes = Math.floor(time / 60); 
  //seconds = takes the remainder dividing by 60 and rounds down
  const seconds = Math.floor(time % 60);
  //milliseconds = reaminder when dviiding by 1, then converts to milliseconds
  const milliseconds = Math.floor((time % 1) * 100);
  //constructs a formatted time string by concatenating padded minutes+seconds+milliseconds - separated by colons
  return `${padTime(minutes)}:${padTime(seconds)}:${padTime(milliseconds)}`;
};

//same in stopwatch.tsx
  //this is crucial for ensuring the mins,secds,millisecs are displayed in consistent formatting! 
  //easy UI for the customer
const padTime = (time: number): string => {
  return time.toString().padStart(2, '0');
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lapsContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  lapText: {
    fontSize: 20,
  },
  
});
