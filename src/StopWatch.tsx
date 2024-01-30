import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

//stopwatch.tsx used for stopwatch displays 
//interface used for defining the properties expected by the stopwatch component
interface StopwatchProps {
  isRunning: boolean;
  lapTime: number;
}
//stopwatch - functional component with props specified by the stopwatchProps interface
const Stopwatch: React.FC<StopwatchProps> = ({ isRunning, lapTime }) => {
  const [lastUpdateTime, setLastUpdateTime] = useState<number | null>(null);
//useEffect- handled interval updates based on isrunning and lastupdatetime
  useEffect(() => {
    //declare var for intervalid
    let intervalId: NodeJS.Timeout;
    //check if the timer is running
    if (isRunning) {
      //if interval is running
      intervalId = setInterval(() => { 
        //update the lastupdatetieme with the currentimtestamp
        const now = Date.now();
        if (lastUpdateTime) {
          setLastUpdateTime(now);
        } }, 1000); //interval here is set to 1 second or 1000 milliseconds
    } else {
      //clear interval and reset it to NULL or 0 if its not running
      clearInterval(intervalId);
      setLastUpdateTime(null);
    }
    //clears the inveral here 
    //run if/when isurnning or lastupdatetime changes
    return () => clearInterval(intervalId); }, [isRunning, lastUpdateTime]);

  //here i needed to calculate the minutes for lap 
  //as well as display it in a 00:00:00 format 
  const formatTime = (time: number): string => { 
    //checks for minutes, seconds, and milliseconds
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const milliseconds = Math.floor((time % 1) * 100);
    //formatted string showing 
    //constructs a formatted time string by concatenating padded minutes+seconds+milliseconds - separated by colons
    return `${padTime(minutes)}:${padTime(seconds)}:${padTime(milliseconds)}`;
  };

  //padtime aka  
    //takes a number (time) - passed above 
    //converts to the a string toString() 
    //uses padStarrt - to check for minimum length of 2 chars, if not it adds a 0 if needed 
    //returns the padded string 

  //this is crucial for ensuring the mins,secds,millisecs are displayed in consistent formatting! 
  //easy UI for the customer
  const padTime = (time: number): string => {
    return time.toString().padStart(2, '0');
  };

  //returns and RENDERS the formatted lap time 
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{formatTime(lapTime)}</Text>
    </View>
  );
};

//testing css for different design 
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  lapButton: {
    backgroundColor: '#dc3545', 
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  resetButton: {
    backgroundColor: '#dc3545', 
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20, 
  },
  text: {
    fontSize: 30,
  }
});


export default Stopwatch;
