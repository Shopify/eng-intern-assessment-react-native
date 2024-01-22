import { useRef, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import StopWatchButton from './StopWatchButton';
import { formatTimeSegment } from './utils';

export default function StopWatch() {

  const [time, setTime] = useState([0, 0, 0]);
  const [isRecording, setIsRecording] = useState(false);

  const intervalIdRef = useRef<number>();

  const styles = StyleSheet.create({
    container: {
      flexDirection: "column",
      justifyContent: 'center'
    }
  })

  const startRecording = () => {
    setIsRecording(true);
    const intervalId = setInterval(() => {
      setTime((time) => {
        const [min, sec, centis] = time;
        let newMin = min, newSec = sec, newCentis;
        newCentis = centis + 1;
        if (newCentis === 100) {
          newSec = sec + 1;
          newCentis = 0
        }
        if (newSec === 60) {
          newMin = min + 1;
          newSec = 0;
        }
        return [newMin, newSec, newCentis]
      })
    }, 10);

    intervalIdRef.current = intervalId;
  }

  const stopRecording = () => {
    setIsRecording(false);
    const intervalId = intervalIdRef.current;
    if (intervalId) clearInterval(intervalId);
  }

  const resetRecording = () => {
    setTime([0, 0, 0]);
    const intervalId = intervalIdRef.current;
    if(intervalId) clearInterval(intervalId)
  }

  return (
    <View style={styles.container}>
      <Text>{formatTimeSegment(time[0])}:{formatTimeSegment(time[1])}:{formatTimeSegment(time[2])}</Text>
      <StopWatchButton
        onPress={isRecording ? stopRecording : startRecording}
        text={isRecording ? "Stop" : "Start"}
      />
      <StopWatchButton
        onPress={resetRecording}
        text="Reset"
      />
    </View>
  );
}