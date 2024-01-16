// TODO: Create lap table, add button styling and text styling, clean up code

import { FlatList, StyleSheet, Text, View } from 'react-native';
import StopWatchButton from './StopWatchButton';
import { useEffect, useState } from 'react';
import { formatTime } from './util/formatTime';

export default function StopWatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [lapTimes, setLapTimes] = useState<number[]>([]);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    let timer: number;

    if (isRunning) {
      setIsDisabled(false);
      timer = setInterval(() => {
        setTime((time) => time + 1000);
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [isRunning]);

  const startStop = () => {
    setIsRunning(!isRunning);
  };

  const reset = () => {
    setIsRunning(false);
    setTime(0);
    setLapTimes([]);
    setIsDisabled(true);
  };

  const onLap = () => {
    console.log(`${formatTime(time)}`)
    setLapTimes([...lapTimes, time]);
  }

  const renderItem = ({ item, index }: { item: number, index: number }) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableCell}>Lap {index + 1}</Text>
      <Text style={styles.tableCell}>{`${formatTime(item)}`}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>
        {formatTime(time)}
      </Text>
      <View style={styles.buttonsContainer}>
        <StopWatchButton 
          title={isRunning ? 'Stop' : 'Start'} 
          onPress={startStop} 
          colour={isRunning ? 'red' : 'green'}
        />
        <StopWatchButton 
          title={isRunning ? 'Lap' : 'Reset'} 
          onPress={isRunning ? onLap : reset} 
          colour={isDisabled ? 'lightgrey' : 'grey'} 
          isDisabled={isDisabled}
        />
      </View>
      <FlatList
        data={lapTimes}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timer: {
    fontSize: 50,
    marginBottom: 30,
    paddingTop: 100,
  },
  lapText: {
    fontSize: 18,
    marginVertical: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    paddingBottom: 30,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tableCell: {
    fontSize: 25,
    paddingRight: 20,
  },
});
