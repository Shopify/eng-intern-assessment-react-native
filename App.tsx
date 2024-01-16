import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import { AppProvider } from '@shopify/polaris';


import StopWatch from './src/StopWatch';
import colors from './config/colors';


export default function App() {
  const onStart = () => {
    // Handle start logic
    console.log('Start button pressed');
  };

  const onStop = () => {
    // Handle stop logic
    console.log('Stop button pressed');
  };

  const onReset = () => {
    // Handle reset logic
    console.log('Reset button pressed');
  };

  const onRecordLap = () => {
    // Handle record lap logic
    console.log('Record lap button pressed');
  };

  return (
    <AppProvider i18n={{}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Stopwatch</Text>
        </View>
        <StopWatch />
        <StatusBar style="auto" />
      </View>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
  },
});