import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View } from 'react-native';

//stopwatch.tsx used for stopwatch displays 

//interface used for defining the properties expected by the stopwatch component
interface StopwatchProps {
  //boolean to check if the stopwatch is running
  isRunning: boolean; 
  //holds the number of elapsed seconds
  seconds: number;
}
//stopwatch - functional component with props specified by the stopwatchProps interface
const Stopwatch: React.FC<StopwatchProps> = ({ isRunning }) => {
  const [seconds, setSeconds] = useState(0);

  //useEffect- manages the timer interval based on the isRunning state
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    //start or stop the timer based on the isRunning state
    if (isRunning) {
        //starts an interval to update the elapsed seconds every 1 second (1000 milliseconds = 1 second)
      intervalId = setInterval(() => {
        //updates the seconds state by incrementing the previous value by 1
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
    } else {
      clearInterval(intervalId); 
    }
    //clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [isRunning]);
  //resets the timer when isRunning state changes to false
  useEffect(() => {
    if (!isRunning) {
      setSeconds(0);
    }
  }, [isRunning]);


  //shows the stopwatch container with the elapsed seconds
  //renders the stopwatch display
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{seconds} s</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
  },
});

export default Stopwatch;
