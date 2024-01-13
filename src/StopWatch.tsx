import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import StopWatchButton from './StopWatchButton';

export default function StopWatch() {

  const enum Colors{
    gray = '#A4A4A4',
    green = '#8A9A5B',
    red = '#ee6b6e'
  }

  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [hasStopped, setHasStopped] = useState(false);
  const [laps, setLaps] = useState([]);
  
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const milliseconds = time % 100;

  // hook that increments the timer
  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => setTime(time + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  const start = () => {
    setHasStopped(false);
    setIsRunning(true);
  };

  const stop = () => {
    setHasStopped(true);
    setIsRunning(false);
  };

  const reset = () => {
    setTime(0);
    setLaps([]);
  };

  const lap = () => {
    setLaps(laps => [...laps, time]);
  };

  const togglePauseResume = () => {
    setIsRunning(!isRunning);
  };

  return(
    <View style={styles.container}>
      <View style={styles.timerContainer}>
        {!hasStopped && <Text style={styles.timer}>
          {minutes.toString().padStart(2, '0')}:
          {seconds.toString().padStart(2, '0')}:
          {milliseconds.toString().padStart(2, '0')}
        </Text>}
        {hasStopped && <View style={styles.emptyTimerContainer}></View>}
      </View>
      <View style={styles.buttonRowContainer}>
        <View style={styles.buttonColumnContainer} >
          <StopWatchButton onClick={lap} disable={!isRunning} color={Colors.gray} title='Lap'/>
          <StopWatchButton onClick={reset} color={Colors.gray} title='Reset'/>
        </View>
        <View style={styles.buttonColumnContainer}>
          <StopWatchButton
          onClick={isRunning? stop: start}
          color={isRunning? Colors.red:Colors.green}
          title={isRunning? "Stop":"Start"}/>
          <StopWatchButton 
          onClick={togglePauseResume}
          disable={hasStopped}
          color={Colors.gray}
          title={isRunning? "Pause":"Resume"}/>
        </View>
      </View>
      <View style={styles.lapTableView}>
      {laps.length!=0 && <ScrollView testID="lap-list" style={styles.lapTable}>
        {laps.map((item, index) => {
          const minutes = Math.floor((item % 360000) / 6000);
          const seconds = Math.floor((item % 6000) / 100);
          const milliseconds = item % 100;
          return(
          <View key={index} style={styles.lapRow}>
          <Text style={styles.lapText}>Lap {index}</Text>
          <Text style={styles.lapTimer}>
            {minutes.toString().padStart(2, '0')}:
            {seconds.toString().padStart(2, '0')}:
            {milliseconds.toString().padStart(2, '0')}</Text>
          </View>
          );
          }
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
    width: '23%',
  },
  lapText: {
    fontSize: 18,
    fontWeight: '500',
    fontFamily: 'Courier New',
  },
  lapRow: {
    flexDirection: 'row',
    marginTop: '8%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lapTableView:{
    height: '53%',
    marginTop: '5%'
  }
})

