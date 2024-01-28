import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import StopWatch from './src/components/StopWatch';

export default function App() {

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.stopWatchView}>
        <StopWatch/>
      </View>
        <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  stopWatchView: {
    marginTop: 50
  }
});
