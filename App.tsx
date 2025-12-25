import React from 'react';
import { StyleSheet, View } from 'react-native';
import StopWatch from './src/StopWatch';

export default function App() {
  return (
    <View style={styles.app}>
    {/* <View> */}
      <StopWatch />
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 100,
  },
});
