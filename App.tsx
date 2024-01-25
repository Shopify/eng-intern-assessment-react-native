import { StatusBar } from 'expo-status-bar';
import StopWatch from './src/StopWatch';
import { SafeAreaView, StyleSheet } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar/>
      <StopWatch/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({ 
screen:{
  flex:1
}
});

