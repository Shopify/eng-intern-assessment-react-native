import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import { AppProvider } from '@shopify/polaris';

// Import the StopWatch component
import StopWatch from './src/StopWatch';
// Import the color configuration
import colors from './config/colors';

// Define the App component
export default function App() {
  // Render the App component
  return (
    <AppProvider i18n={{}}>
      <View style={styles.container}>
        {/* Display the header with the application title */}
        <View style={styles.header}>
          <Text style={styles.title}>Stopwatch</Text>
        </View>
        {/* Render the StopWatch component to display the stopwatch */}
        <StopWatch />
        <StatusBar style="auto" />
      </View>
    </AppProvider>
  );
}

// Define styles for the App component
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