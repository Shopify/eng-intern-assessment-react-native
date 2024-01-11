import React from 'react';
import { View, StyleSheet } from 'react-native';
import StopWatch from './src/StopWatch';

const App = () => {
  return (
    <View style={styles.container}>
      <StopWatch elapsedTime={0} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
