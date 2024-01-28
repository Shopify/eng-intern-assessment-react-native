import { StyleSheet, Text, View } from 'react-native';
import StopWatchButton from './components/StopWatchButton';
import StopWatchCounter from './components/StopWatchCounter';
import LapsView, { updateLaps } from './components/LapsView';
import { swState } from './utils/StopWatchCounterState';
import { useState } from 'react';
import { theme } from './data/theme';

export default function StopWatch() {
  const [swStatus, setSwStatus] = useState<string>("Start");
  const [displayLaps, setDisplayLaps] = useState<boolean>(false);
  const [stopped, setStopped] = useState<boolean>(false);

  function stopStartButton() {
    setStopped(false);
    if (swStatus === "Start") {
      setSwStatus("Pause");
      swState.start();
    } else if (swStatus === "Pause") {
      setSwStatus("Resume");
      swState.pause();
    } else if (swStatus === "Resume") {
      setSwStatus("Pause");
      swState.resume();
    }
  } 

  function resetButton() {
    swState.reset();
    if(!swState.run) {
      setSwStatus("Start");
    }
    updateLaps();
    setDisplayLaps(false);
  }

  function lapButton() {
    swState.lap();
    updateLaps();
    setDisplayLaps(true);
  }

  function stopButton() {
    swState.pause();
    setSwStatus("Start");
    setStopped(true);
  }

  return (
    <View>
      <Text style={styles.title}>Stop Watch</Text>
      <View style={styles.roundBg}>
        {!stopped && <StopWatchCounter></StopWatchCounter>}
      </View>
      <View style={styles.lapsPlace}>
      {displayLaps &&
        <LapsView></LapsView>
      
      }
      </View>
      <View style={styles.buttonsContainer}>
        <StopWatchButton name={swStatus} action={stopStartButton}></StopWatchButton>
        <StopWatchButton name={"Stop"} action={stopButton}></StopWatchButton>
        <StopWatchButton name={"Reset"} action={resetButton}></StopWatchButton>
        <StopWatchButton name={"Lap"} action={lapButton}></StopWatchButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  roundBg: {
    backgroundColor: theme.primary,
    borderRadius: 150,
    margin: 10,
    height: 300,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 50,
    textAlign: 'center',
    color: theme.primary,
    marginBottom: 40,
  },
  lapsPlace: {
    height: 200,
    maxHeight: 200,
    margin: 10,
  },
});
