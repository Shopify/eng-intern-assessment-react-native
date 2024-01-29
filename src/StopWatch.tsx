import { StyleSheet, Text, View } from 'react-native';
import StopWatchButton from './StopWatchButton';
import { useEffect, useState } from 'react';

function formatTime(millis: number){
  const hours = millis
}

export default function StopWatch() {
  const[time, setTime] = useState(0);
  const [isTimerOn, setIsTimerOn] = useState(false);

  useEffect(() => {
    let interval: number | null = null;

    if(isTimerOn){
      interval = setInterval(() => {
        setTime(time => time+1)
      }, 10);
    } else if(!isTimerOn && time > 0){
      clearInterval(interval!);
    }

    return () => clearInterval(interval!);
  })

  return (
    <View style={styles.container}>
      <View style={styles.stopwatchContainer}>
        <Text style={styles.text}>{time}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonsRowContainer}>
          <StopWatchButton action='start' onPress={() => setIsTimerOn(true)}></StopWatchButton>
          <StopWatchButton action='stop' onPress={() => setIsTimerOn(false)}></StopWatchButton>
        </View>
        <View style={styles.buttonsRowContainer}> 
          <StopWatchButton action='lap' onPress={() => console.log("Nice")}></StopWatchButton>
          <StopWatchButton action='reset' onPress={() => console.log("Nice")}></StopWatchButton>
        </View>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  stopwatchContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "60%",
    width: "90%",
  },
  buttonsContainer:{
    justifyContent: "flex-end",
    alignItems: "center",
    height: "40%",
    width: "90%",
    // borderWidth: 2,
    // borderColor: "white"
  },
  buttonsRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    // borderWidth: 2,
    // borderColor: "white",
    width: "80%",
    marginBottom: 32,
  },
  text: {
    color: "#FAFAFA",
    fontSize: 64,
  },
})