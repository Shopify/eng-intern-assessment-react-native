import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import StopWatch from './src/StopWatch';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar
        style = "light"
        backgroundColor = "black"
      />
      <StopWatch></StopWatch>

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
