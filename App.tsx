import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, SafeAreaView, Text } from 'react-native';


import Stopwatch from './src/StopWatch';
import colors from './config/colors';


// Define the App component
export default function App() {
  // Render the App component
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Stopwatch</Text>
      </View>
      <Stopwatch />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: colors.offwhite,
    marginTop: 10,
    marginBottom: 20,
    shadowColor: colors.black,
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 1,
  },
});