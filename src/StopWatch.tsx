import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, Image, StyleSheet} from 'react-native';
import StopWatchButton from "./StopWatchButton";
import StopWatchDisplay from "./StopWatchTimeDisplay";

export default function StopWatch() {

  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [timeInSeconds, setTimeInSeconds] = useState(0);

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
        break;
      case 'Reset':
        setHasStarted(false);
        setIsRunning(false);
        setTimeInSeconds(0);
        break;
      case 'Pause':
        setIsRunning(false);
        break;
      case 'Resume':
        setIsRunning(true);
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
        />
        <StopWatchButton
          title={isRunning ? 'Pause' : 'Resume'}
          onClick={handleButtonClick}
          color={hasStarted ? '#98bb52' : 'darkgrey'}
        />
      </View>
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
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: "wrap"
  },
});
