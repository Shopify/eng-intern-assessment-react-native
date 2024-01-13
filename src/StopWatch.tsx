import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import StopWatchButton from './StopWatchButton';
import { useEffect, useState } from 'react';
import displayTime from './utils/DisplayTime';

export default function StopWatch() {

  const [isOn, setIsOn] = useState(false);
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState<{[key: number]: number}>({});

  useEffect(() => {
    let timeInterval: number | undefined;

    if (isOn) {
      timeInterval = setInterval(() => {
        setTime((lastTime) => lastTime + 0.1);
      }, 100);
    }
    else if (timeInterval) {
      clearInterval(timeInterval);
    }
    return () => {
      if (timeInterval) {
        clearInterval(timeInterval)
      }
    };
  }, [isOn]);

  const startStop = () => {
    setIsOn(!isOn);
  };

  const reset = () => {
    setIsOn(false);
    setTime(0);
    setLaps({});
  };

  const lap = () => {
    if(isOn) {
      setLaps((previousLaps) => ({
        ...previousLaps,
        [`Lap${Object.keys(previousLaps).length + 1}`]: time,
      }))
    }
  };

  const stop = () => {
    setIsOn(false);
    setTime(0);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.dialView}>{displayTime(time)}</Text>
      <View style={styles.buttonView}>
        <StopWatchButton title={'Start'} onPress={startStop} />
        <StopWatchButton title={isOn ? 'Pause' : 'Resume'} onPress={startStop} />
        <StopWatchButton title={'Stop'} onPress={stop} />
      </View>
      <View style={styles.buttonView}>
        <StopWatchButton title='Reset' onPress={reset} />
        <StopWatchButton title='Lap' onPress={lap} />
      </View>
      <ScrollView style={styles.scrollView}>
        {Object.entries(laps).length > 0 && (
          <View testID='lap-list'>
            <Text>Lap Times:</Text>
            {Object.entries(laps).map(([lapKey, lapTime]) => (
              <Text key={lapKey}>{`${lapKey}: ${displayTime(lapTime)}`}</Text>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  dialView: {
    fontSize: 50,
    padding: 10,
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
});