import { StyleSheet, Text, View } from 'react-native';
import StopWatch from './src/StopWatch';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style = {styles.text}>Stop Watch</Text>
      <StopWatch/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#28282B',
    alignItems: 'center',
    paddingTop: 130
  },
  text: {
    color: '#FFFFFF',
    fontSize: 50,
    fontWeight: "100",
    marginBottom: 30
  }
});
