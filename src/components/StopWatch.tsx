import { FlatList, StyleSheet, Text, View } from 'react-native';
import StopWatchButton from './StopWatchButton';
import { useEffect, useState } from 'react';
import { formatTime } from '../utils/formatTime';

//LapItem contains the field needed to display the laps 
type LapItem = {
  index: number;
  lapTime: number;
  generalTime: number;
}

//renderLap function is used to render each lapItem into a row with the formatted time
const renderLap = ({ item }: { item: LapItem }) => {
  return (
    <View style={styles.lapItemContainer}>
      <View style={styles.lapsHeaderLeftSection}>
        <Text style={styles.text}>
          {item.index.toString()}
        </Text>
      </View>
      <View style={styles.lapsHeaderMiddleSection}>
        <Text style={styles.text}>
          {formatTime(item.lapTime)}
        </Text>
      </View>
      <View style={styles.lapsHeaderRightSection}>
        <Text style={styles.text}>
          {formatTime(item.generalTime)}
        </Text>
      </View>
    </View>
    
  );
};

export default function StopWatch() {
  //States:
  //startTime, the startTime of the stopwatch, necessary for precise milliseconds display
  //time, the time in milliseconds passed from the beginning
  //isTimerOn, a boolean state needed to set the timer on/off
  //lapItems, a state array needed to add lapItems and display the laps
  const [startTime, setStartTime] = useState<number | null>(null);
  const [time, setTime] = useState(0);
  const [isTimerOn, setIsTimerOn] = useState(false);
  const [lapItems, setLapItems] = useState<LapItem[]>([]);

  //useEffect is needed here to update the time once the user presses Start or Stop
  useEffect(() => {
    let interval: number | null = null;

    //Checks if the timer is on:
    //If it is on: keep incrementing the time
    if(isTimerOn){
      if (startTime === null) {
        setStartTime(Date.now() - time);
      }

      interval = setInterval(() => {
        setTime(Date.now() - startTime!);
      }, 1);
    } else {
      //If the timer is off: stop incrementing the time
      setStartTime(null);
    }

    //Clear the interval on return
    return () => clearInterval(interval!);
  })

  //reset the timer by resetting all time states and laps
  function resetTimer(){
    setTime(0);
    setIsTimerOn(false);
    setLapItems([]);
  }

  //function to add a lap item
  function addLap(){
    //Gets the latest lap item to get the time and the index, if there's no previous lap item, start at 0
    const newestTime = lapItems.length > 0 ? lapItems[lapItems.length-1].generalTime : 0;
    const newestIndex = lapItems.length > 0 ? lapItems[lapItems.length-1].index : 0;

    //Create a new lap item using the latest lap item
    //Increment the index and calculate the lap time using the time now - the time at which the previous lap was at
    const newLapItem = {
      index: newestIndex+1,
      lapTime: time-newestTime,
      generalTime: time
    }

    //Create a new laps array and add the new object
    const newLaps = [
      ...lapItems.slice(0, lapItems.length),
      newLapItem,
      ...lapItems.slice(lapItems.length)
    ];

    //Set the lap items to the new array
    setLapItems(newLaps);
  }

  return (
    <View style={styles.container}>
      <View style={styles.stopwatchContainer}>
        <Text style={styles.stopwatchText}>{formatTime(time)}</Text>
      </View>
      <View style={styles.lapsContainer}>
        {lapItems.length > 0 ?
          <View style={styles.lapsHeader}>
          <View style={styles.lapsHeaderLeftSection}>
            <Text style={styles.text}>Lap</Text>
          </View>
          <View style={styles.lapsHeaderMiddleSection}>
            <Text style={styles.text}>Lap Time</Text>
          </View>
          <View style={styles.lapsHeaderRightSection}>
            <Text style={styles.text}>Overall Time</Text>
          </View>
        </View> : 
        null}
        <FlatList
          data={[...lapItems].reverse()}
          renderItem={renderLap}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonsRowContainer}>
          <StopWatchButton action='start' onPress={() => setIsTimerOn(true)} isDisabled={isTimerOn} buttonColor='#62a84f' buttonBorderColor='#326345'/>
          <StopWatchButton action='stop' onPress={() => setIsTimerOn(false)} isDisabled={!isTimerOn}></StopWatchButton>
        </View>
        <View style={styles.buttonsRowContainer}> 
          <StopWatchButton action='lap' onPress={addLap} isDisabled={!isTimerOn}></StopWatchButton>
          <StopWatchButton action='reset' onPress={resetTimer} isDisabled={time === 0} buttonColor='#e3494c' buttonBorderColor='#940628'></StopWatchButton>
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
  lapsHeader: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 4,
  },
  lapsHeaderLeftSection: {
    width: "20%",
  },
  lapsHeaderMiddleSection: {
    width: "40%",
    alignItems: "center",
  },
  lapsHeaderRightSection: {
    width: "40%",
    alignItems: "flex-end",
  },
  lapsContainer: {
    height: "40%",
    width: "80%",
  },
  lapItemContainer:{
    flexDirection: "row",
    alignItems: "center",
  },
  buttonsContainer:{
    justifyContent: "flex-end",
    alignItems: "center",
    height: "30%",
    width: "90%",
  },
  buttonsRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
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