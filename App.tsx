// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import StopWatch from './src/StopWatch';
import { Icon } from '@rneui/themed';

export default function App() {
  return (
    <View style={styles.container}>
      <View style= {styles.title}>
        <Icon 
          name='timer'
          type='material-community'
          size={80}
        />
        <Text style= {styles.text}>Stopwatch</Text>
      </View>
      <StopWatch />
      {/* <StatusBar style="auto" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight,
    paddingBottom: 20
  },
  text: {
    fontSize: 50
  },
});
