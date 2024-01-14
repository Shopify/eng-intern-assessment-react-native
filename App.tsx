import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StopWatch from './src/StopWatch';

export default function App() {
  return (
    <View style={styles.container}>
      <Text key='title' style={styles.title}>Let's stop this watch!</Text>
      <StopWatch/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title:{
    marginTop: '18%',
    fontSize: 15,
    fontFamily: 'Courier New',
    fontWeight: '500'
  }
});
