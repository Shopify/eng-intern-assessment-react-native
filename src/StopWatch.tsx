import { FlatList, StyleSheet, Text, View } from 'react-native';
import StopWatchButton from './StopWatchButton';
import { useEffect, useState } from 'react';

type LapItem = {
  index: number;
  lapTime: number;
  generalTime: number;
}

function formatTime(millis: number): string {
  const hours = Math.floor((millis/1000)/3600);
  const minutes = Math.floor(((millis/1000) - (hours*3600))/60);
  const seconds = Math.floor((millis/1000)%60);
  const millisFormatted = millis%1000;

  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${millisFormatted.toString().padStart(3, "0")}`;
}

const renderLap = ({ item }: { item: LapItem }) => {
  return (
    <View style={styles.lapItemContainer}>
      <View style={{width: "20%"}}>
        <Text style={styles.text}>
          {item.index.toString()}
        </Text>
      </View>
      <View style={{width: "40%", alignItems: "center"}}>
        <Text style={styles.text}>
          {formatTime(item.lapTime)}
        </Text>
      </View>
      <View style={{width: "40%", alignItems: "flex-end"}}>
        <Text style={styles.text}>
          {formatTime(item.generalTime)}
        </Text>
      </View>
    </View>
    
  );
};

export default function StopWatch() {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [time, setTime] = useState(0);
  const [isTimerOn, setIsTimerOn] = useState(false);
  const [lapItems, setLapItems] = useState<LapItem[]>([]);

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
    setLapItems([]);
  }

  function addLap(){
    const newestTime = lapItems.length > 0 ? lapItems[lapItems.length-1].generalTime : 0;
    const newestIndex = lapItems.length > 0 ? lapItems[lapItems.length-1].index : 0;

    const newLapItem = {
      index: newestIndex+1,
      lapTime: time-newestTime,
      generalTime: time
    }

    const newLaps = [
      ...lapItems.slice(0, lapItems.length),
      newLapItem,
      ...lapItems.slice(lapItems.length)
    ];

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
          <View style={{width: "20%"}}>
            <Text style={styles.text}>Lap</Text>
          </View>
          <View style={{width: "40%", alignItems: "center"}}>
            <Text style={styles.text}>Lap Time</Text>
          </View>
          <View style={{width: "40%", alignItems: "flex-end"}}>
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
          <StopWatchButton action='start' onPress={() => setIsTimerOn(true)} isDisabled={isTimerOn}/>
          <StopWatchButton action='stop' onPress={() => setIsTimerOn(false)} isDisabled={!isTimerOn}></StopWatchButton>
        </View>
        <View style={styles.buttonsRowContainer}> 
          <StopWatchButton action='lap' onPress={addLap} isDisabled={!isTimerOn}></StopWatchButton>
          <StopWatchButton action='reset' onPress={resetTimer} isDisabled={time === 0}></StopWatchButton>
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
  lapsContainer: {
    height: "30%",
    width: "80%",
  },
  lapItemContainer:{
    flexDirection: "row",
    alignItems: "center",
  },
  buttonsContainer:{
    justifyContent: "flex-end",
    alignItems: "center",
    height: "40%",
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