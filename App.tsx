import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StopWatch from './src/StopWatch';
import { useState } from 'react';
import { convertMillisToClockTime } from './util/TimeConverter';

export default function App() {

  const [timeElapsed, setTimeElapsed] = useState(24325);

  return (
    <View style={styles.container}>
        <StopWatch {...convertMillisToClockTime(timeElapsed)}/>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
