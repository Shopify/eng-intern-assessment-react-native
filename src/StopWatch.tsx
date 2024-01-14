import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import StopWatchButton from './StopWatchButton';

export default function StopWatch() {

  const enum Colors{
    gray = '#A4A4A4',
    green = '#8A9A5B',
    red = '#ee6b6e'
  }

  // time elapsed on stopwatch
  const [time, setTime] = useState(0);
  // if stopwatch is currently running
  const [isRunning, setIsRunning] = useState(false);
  // if the 'stop' button is pressed
  const [hasStopped, setHasStopped] = useState(false);
  // an array of elapsed laps
  const [laps, setLaps] = useState([]);

  // elapsed time in minutes, seconds, and milliseconds
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const milliseconds = time % 100;

  // hook that increments the timer
  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => setTime(time + 1), 10); // every 10 milliseconds
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  // start stopwatch
  // currently functions the same as the resume button
  const start = () => {
    setHasStopped(false);
    setIsRunning(true);
  };

  // stop stopwatch
  // currently functions the same as the pause button, but removes the display
  // of time on the interface
  const stop = () => {
    setHasStopped(true);
    setIsRunning(false);
  };

  // clear elapsed time and laps
  const reset = () => {
    setTime(0);
    setLaps([]);
  };

  //record a lap
  const lap = () => {
    setLaps(laps => [...laps, time]);
  };

  // switch between pause and resume
  const togglePauseResume = () => {
    setIsRunning(!isRunning);
  };

  // format time from milliseconds to minutes:seconds:centiseconds
  const formatTime = (timeElapsed) => {
    const minutes = Math.floor((timeElapsed % 360000) / 6000);
    const seconds = Math.floor((timeElapsed % 6000) / 100);
    const milliseconds = timeElapsed % 100;

    const display = `${minutes.toString().padStart(2, '0')}\
:${seconds.toString().padStart(2, '0')}\
:${milliseconds.toString().padStart(2, '0')}`;
    return display
  };

  return(
    <View>
      <View style={styles.timerContainer}>
        {!hasStopped && <Text style={styles.timer}>
          {formatTime(time)}
        </Text>
        }
        {hasStopped && <View style={styles.emptyTimerContainer}></View>}
      </View>

      <View style={styles.buttonRowContainer}>
        <View style={styles.buttonColumnContainer} >
          <StopWatchButton 
          onClick={lap}
          disable={!isRunning}
          color={Colors.gray}
          title='Lap'/>
          <StopWatchButton onClick={reset} color={Colors.gray} title='Reset'/>
        </View>
        <View style={styles.buttonColumnContainer}>
          <StopWatchButton
          onClick={isRunning? stop : start}
          color={isRunning? Colors.red : Colors.green}
          title={isRunning? "Stop" : "Start"}/>
          <StopWatchButton 
          onClick={togglePauseResume}
          disable={hasStopped}
          color={Colors.gray}
          title={isRunning? "Pause" : "Resume"}/>
        </View>
      </View>

      <View style={styles.lapTableView}>
        {laps.length!=0 && <ScrollView testID="lap-list" style={styles.lapTable}>
          {laps.map((item, index) => {
            return(
            <View key={index} style={styles.lapRow}>
            <Text style={styles.lapText}>Lap {index}</Text>
            <Text style={styles.lapTimer}>{formatTime(item)}</Text>
            </View>
            );}
          )}
        </ScrollView>}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  timerContainer: {
    marginTop: '10%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  emptyTimerContainer:{
    height: 100,
    width: 340,
  },
  timer: {
    height: 100,
    fontSize: 70,
    width: 340,
    fontFamily: 'Courier New',
    justifyContent: 'space-between'    
  },
  buttonRowContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonColumnContainer:{
    flex: 1,
    alignItems: 'center',
    justifyContent:'space-between'
  },
  lapTimer: {
    fontSize: 18,
    fontWeight: '400',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '23%'
  },
  lapText: {
    fontSize: 18,
    fontWeight: '500',
    fontFamily: 'Courier New'
  },
  lapRow: {
    flexDirection: 'row',
    marginTop: '8%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  lapTableView:{
    height: '53%',
    marginTop: '5%'
  }
})

