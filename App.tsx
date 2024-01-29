import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StopWatch from './src/StopWatch';
import StopWatchButton from './src/StopWatchButton';
import { styles } from './src/Styles';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{StopWatch()}</Text>
      <StatusBar style="auto" />
    </View>
  );
}
