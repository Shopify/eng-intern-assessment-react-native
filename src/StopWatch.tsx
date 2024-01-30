import React, { useRef, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import StopWatchButton from './StopWatchButton';


// Summary. Virtual stopwatch that counts seconds, and displays the number of hours:minutes:seconds.
export default function StopWatch() {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [on, setOn] = useState<boolean>(false);
  const [hideTime, setHideTime] = useState<boolean>(false);
  type lapData = {
    id: number;
    lapTime: number;
  };

  var lapData = useRef<lapData[]>([]);
  var intervalRef = useRef(0); 
  var timeRef = useRef(0);

  /**
   * Function description. Used to start the stopWatch tracked in timeRef, displayed with setCurrentTime by adding one second to timeRef.
   */
  const startStopWatch = () => {
    setOn(true);
    setHideTime(false);
    intervalRef.current = setInterval(() => {
      setCurrentTime(timeRef.current + 1);
      timeRef.current++;
    }, 1000);
  }
  /**
   * Function description. Used to pause the stopWatch by stopping the interval change.
   */
  const pauseStopWatch = () => {  
    setOn(false);
    setHideTime(false);
    clearInterval(intervalRef.current);
  }
  /**
   * Function description. Used to stop the stopWatch by reseting all states back to initial states. It will hide the timer.
   */
  const stopStopWatch = () => {
    setOn(false);
    setHideTime(true);
    clearInterval(intervalRef.current);
    intervalRef.current = 0;
    timeRef.current = 0;
    setCurrentTime(0);
  }
  /**
   * Function description. Used to stop the stopWatch by reseting all states back to initial states. It will not hide the timer.
   */
  const resetStopWatch = () => { 
    setOn(false);
    setHideTime(false);
    clearInterval(intervalRef.current);
    intervalRef.current = 0;
    timeRef.current = 0;
    setCurrentTime(0);
    lapData.current = [];
  }; 
  /**
   * Function description. Used to resume the stopWatch by adding a second to the timeRef every second
   */
  const resumeStopWatch = () => { 
    setOn(true);
    setHideTime(false);
    setCurrentTime(timeRef.current + 1);
    timeRef.current++; 
    intervalRef.current = setInterval(() => {
      setCurrentTime(timeRef.current + 1);
      timeRef.current++; 
    }, 1000);
  };
  /**
   * Function description. used to add a lap (timestamp) to an array of other laps called lapData.
   */
  const addLapTime = () => {
    lapData.current.push({ lapTime: currentTime, id: lapData.current.length });
  }

  return (
    <View style={styles.container}>
      <View style={styles.timeTextContainer}>
        {!hideTime 
          ? <Text style={styles.timeText}>
              {Math.floor(currentTime / 60 / 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}:{Math.floor(currentTime / 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}:{(currentTime % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}
            </Text>
          : <></>
        }
      </View>

      <View style={styles.reactiveButtonsContainer}>
        {!on 
          ? (timeRef.current != 0) 
            ? <StopWatchButton title="Resume" onPress={()=>{resumeStopWatch()}}/>
            : <StopWatchButton title="Start" onPress={()=>{startStopWatch()}}/>
          : <>
              <StopWatchButton title="Pause" onPress={()=>{pauseStopWatch()}}/>
              <StopWatchButton title="Stop" onPress={()=>{stopStopWatch()}}/>
            </>
        }
      </View>

      <View style={styles.constantButtonsContainer}>
        <StopWatchButton title="Reset" onPress={()=>{resetStopWatch()}}/>
        <StopWatchButton title="Lap" onPress={()=>{addLapTime()}}/>
      </View>

      <View style={styles.lapsTimeContainer}>
        <FlatList
          data={lapData.current}
          renderItem={({item}) => 
            <Text>Lap {item.id.toString()} = {Math.floor(item.lapTime / 60 / 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}:{Math.floor(item.lapTime / 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}:{(item.lapTime % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}</Text>
          }
          keyExtractor={item => item.id.toString()}
          scrollEnabled={true}
          data-testID='lap-list'
          persistentScrollbar={true}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeTextContainer: {
  },
  timeText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  reactiveButtonsContainer: {
  },
  constantButtonsContainer: {
    flexDirection: 'row',
  },
  lapsTimeContainer: {
    height: "30%",
    width: "100%"
  }
});