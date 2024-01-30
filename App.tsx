import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
<<<<<<< HEAD
=======
import StopWatch from './src/StopWatch';
>>>>>>> bfc9246 (Finally Done!)

export default function App() {
  return (
    <View style={styles.container}>
<<<<<<< HEAD
      <Text>Open up App.tsx to start working on your app!</Text>
=======
      <StopWatch/>
>>>>>>> bfc9246 (Finally Done!)
      <StatusBar style="auto" />
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
