import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, View, Text, Image, Platform } from 'react-native';
import StopWatch from './src/components/StopWatch';

const isAndroid = Platform.OS === 'android';

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
    paddingTop: isAndroid ? 45 : 0,
  },
  stopWatchView: {
    flex:1,
  },
  createdBy: { 
    fontFamily: isAndroid ? 'Roboto' : 'Georgia-Italic', 
    marginBottom: 6 
  },
  logo: {
    width: 100, 
    height: 25, 
    marginBottom: 25    
  }
});
