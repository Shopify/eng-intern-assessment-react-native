import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, View, Text, Image } from 'react-native';
import StopWatch from './src/components/StopWatch';

export default function App() {

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.createdBy}>Stopwatch created by Viviane Bresolin for</Text>
      <View>
        <Image
          source={require('./assets/shopify-logo.png')}
          style={styles.logo}
        />
      </View>
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
    flex:1,
  },
  createdBy: { 
    fontFamily: 'Georgia-Italic', 
    marginBottom: 6 
  },
  logo: {
    width: 100, 
    height: 25, 
    marginBottom: 25    
  }
});
