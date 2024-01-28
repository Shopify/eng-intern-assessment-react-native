import { StyleSheet, Text, View } from 'react-native';

import StopWatch from './src/StopWatch';

const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <StopWatch/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App
