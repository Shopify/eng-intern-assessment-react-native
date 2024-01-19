import {StatusBar} from "expo-status-bar";
import React from "react";
import {StyleSheet, Platform, SafeAreaView} from 'react-native';
import StopWatch from "./src/StopWatch";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StopWatch/>
      <StatusBar style="auto"/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
});
