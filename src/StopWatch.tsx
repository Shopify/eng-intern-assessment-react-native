import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import StopWatchButton from './StopWatchButton';
import { useEffect, useState } from 'react';
import displayTime from './utils/DisplayTime';

export default function StopWatch() {

  const [isOn, setIsOn] = useState(false);
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState<{[key: string]: string}>({});

  useEffect(() => {
    let timeInterval: number | undefined;

    if (isOn) {
      timeInterval = setInterval(() => {
        setTime((lastTime) => lastTime + 1);
      }, 1000);
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
    if (isOn) {
      setTime(0);
      setIsOn(false);
    }
    else if (time===0){
      setIsOn(true);
    }
  };

  const pauseResume = () => {
    if (time!==0) {
      setIsOn(!isOn);
    }
  }

  const reset = () => {
    setIsOn(false);
    setTime(0);
    setLaps({});
  };

  const lap = () => {
    if(isOn) {
      setLaps((previousLaps) => ({
        [`Lap${Object.keys(previousLaps).length + 1}`]: displayTime(time), ...previousLaps
      }))
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.dialView}>{displayTime(time)}</Text>
      <View style={styles.buttonsRow}>
      <StopWatchButton title={isOn ? 'Stop' : 'Start'} onPress={startStop} background={isOn ? '#3C1715' : '#1B361F'} color={isOn ? '#E33935' : '#50D167'}/>
        <StopWatchButton title={isOn ? 'Pause' : 'Resume'} onPress={pauseResume} background={isOn ? '#3C1715' : '#1B361F'} color={isOn ? '#E33935' : '#50D167'} />
      </View>
      <View style={styles.buttonsRow}>
        <StopWatchButton title='Reset' onPress={reset} color='#FFFFFF' background='#3D3D3D'/>
        <StopWatchButton title='Lap' onPress={lap} color='#FFFFFF' background='#3D3D3D' />
      </View>
      <ScrollView style={styles.scrollView}>
        {Object.entries(laps).length > 0 && (
            <View>
            {/* <Text>Lap Times:</Text> */}
            <View testID='lap-list'>
            {Object.entries(laps).map(([lapKey, lapTime]) => (
              <View style={styles.lap} key={lapKey}>
              <Text style={styles.lapText} >{`${lapKey}:`}</Text>
              <Text style={styles.lapText} >{`${lapTime}`}</Text>
              </View>
            ))}
            </View>
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
    backgroundColor: '#0D0D0D',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  dialView: {
    color: '#FFFFFF',
    fontSize: 80,
    fontWeight: '200',
    width: 300,
  },
  scrollView: {
    alignSelf: 'stretch'
  },
  buttonsRow: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    marginTop: 40,
    marginBottom: 10,
  },
  lapText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  lap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#151515',
    borderTopWidth: 1,
    paddingVertical: 10,
  },
});