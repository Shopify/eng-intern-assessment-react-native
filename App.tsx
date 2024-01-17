import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import { AppProvider } from '@shopify/polaris';


import Stopwatch from './src/StopWatch';
import colors from './config/colors';


// Define the App component
export default function App() {
  // Render the App component
  return (
    <AppProvider i18n={{}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Stopwatch</Text>
        </View>
        <Stopwatch />
        <StatusBar style="auto" />
      </View>
    </AppProvider>
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
    fontSize: 40,
    fontWeight: 'bold',
    color: colors.white,
    marginTop: 40,
    marginBottom: 40,
  },
});