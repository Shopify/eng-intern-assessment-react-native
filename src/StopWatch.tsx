import { FlatList, StyleSheet, Text, View } from 'react-native';
import StopWatchButton from './StopWatchButton';
import { useEffect, useState } from 'react';

function formatTime(millis: number): string {
  const hours = Math.floor((millis/1000)/3600);
  const minutes = Math.floor(((millis/1000) - (hours*3600))/60);
  const seconds = Math.floor((millis/1000)%60);
  const millisFormatted = millis%1000;

  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${millisFormatted.toString().padStart(3, "0")}`;
}

const renderLap = ({ item }: { item: number }) => {
  return (
    <Text style={styles.text}>
      {formatTime(item)}
    </Text>
  );
};

export default function StopWatch() {
  const[startTime, setStartTime] = useState<number | null>(null);
  const[time, setTime] = useState(3560000);
  const [isTimerOn, setIsTimerOn] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);

  useEffect(() => {
    let interval: number | null = null;

    if(isTimerOn){
      if (startTime === null) {
        setStartTime(Date.now() - time);
      }

      interval = setInterval(() => {
        setTime(Date.now() - startTime!);
      }, 1);
    } else {
      setStartTime(null);
    }

    return () => clearInterval(interval!);
  })

  function resetTimer(){
    setTime(0);
    setIsTimerOn(false);
    setLaps([]);
  }

  function addLap(){
    const newLaps = [
      ...laps.slice(0, laps.length),
      time,
      ...laps.slice(laps.length)
    ];

    console.log(newLaps);
    setLaps(newLaps);
  }

  return (
    <View style={styles.container}>
      <View style={styles.stopwatchContainer}>
        <Text style={styles.stopwatchText}>{formatTime(time)}</Text>
      </View>
      <View style={styles.lapsContainer}>
        <FlatList
          data={laps}
          renderItem={renderLap}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonsRowContainer}>
          <StopWatchButton action='start' onPress={() => setIsTimerOn(true)}></StopWatchButton>
          <StopWatchButton action='stop' onPress={() => setIsTimerOn(false)}></StopWatchButton>
        </View>
        <View style={styles.buttonsRowContainer}> 
          <StopWatchButton action='lap' onPress={addLap}></StopWatchButton>
          <StopWatchButton action='reset' onPress={resetTimer}></StopWatchButton>
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
    justifyContent: "flex-end",
    alignItems: "center",
    height: "30%",
    width: "90%",
  },
  lapsContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "30%",
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
  stopwatchText: {
    color: "#FAFAFA",
    fontSize: 48,
  },
  text: {
    color: "#FAFAFA",
    fontSize: 16,
  },
})