import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, Image, StyleSheet, Text} from 'react-native';
import StopWatchButton from "./StopWatchButton";
import StopWatchDisplay from "./StopWatchTimeDisplay";
import LapsTable from "./LapsTable";

export default function StopWatch() {

  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [timeInSeconds, setTimeInSeconds] = useState(0);
  const [lapTimes, setLapTime] = useState<number[]>([])

  useEffect(() => {
    let interval = 0;

    if (isRunning) {
      interval = setInterval(() => {
        setTimeInSeconds(prevTime => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleButtonClick = (buttonTitle: string) => {
    switch (buttonTitle) {
      case 'Start':
        setHasStarted(true);
        setTimeInSeconds(0);
        setIsRunning(true);
        break;
      case 'Stop':
        setHasStarted(false);
        setIsRunning(false);
        setTimeInSeconds(-1);
        setLapTime(lapTimes => []);
        break;
      case 'Reset':
        setHasStarted(false);
        setIsRunning(false);
        setTimeInSeconds(0);
        setLapTime(lapTimes => []);
        break;
      case 'Pause':
        setIsRunning(false);
        break;
      case 'Resume':
        if (hasStarted) {
          setIsRunning(true);
        }
        break;
      case 'Lap':
        if (hasStarted && isRunning) {
          setLapTime(lapTimes => [...lapTimes, timeInSeconds]);
        }
        break;
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/Shopify_logo.png')}
          style={styles.logo}
          resizeMode={'contain'}
        />
      </View>
      <View style={styles.timerDisplay}>
        <StopWatchDisplay timeInSeconds={timeInSeconds}/>
      </View>
      <View style={styles.buttonContainer}>
        <StopWatchButton
          title={'Reset'}
          onClick={handleButtonClick}
          color={'#98bb52'}
        />
        <StopWatchButton
          title={isRunning ? 'Stop' : 'Start'}
          onClick={handleButtonClick}
          color={isRunning ? 'red' : '#98bb52'}
        />
        <StopWatchButton
          title={'Lap'}
          onClick={handleButtonClick}
          color={(hasStarted && isRunning) ? '#98bb52' : 'darkgrey'}
          isDisabled={!(hasStarted && isRunning)}
        />
        <StopWatchButton
          title={isRunning ? 'Pause' : 'Resume'}
          onClick={handleButtonClick}
          color={hasStarted ? '#98bb52' : 'darkgrey'}
          isDisabled={!hasStarted}
        />
      </View>
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>Lap Number</Text>
        <Text style={styles.headerText}>Time</Text>
      </View>
      <LapsTable lapTimes={lapTimes}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start'
  },
  logoContainer: {
    flex: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: '70%'
  },
  timerDisplay: {
    flex: 0.6,
    margin: 0
  },
  buttonContainer: {
    flex: 0.8,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: "wrap",
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomColor: 'darkgrey',
    borderBottomWidth: 2,
    width: '90%',
    alignSelf: 'center'
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
