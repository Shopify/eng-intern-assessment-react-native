import React from 'react';
import {SafeAreaView, View, Image, Dimensions, StyleSheet} from 'react-native';
import StopWatchButton from "./StopWatchButton";
import StopWatchDisplay from "./StopWatchTimeDisplay";

export default function StopWatch() {
  const handleButtonClick = (buttonTitle: string) => {
    console.log(`${buttonTitle} pressed`);
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
        <StopWatchDisplay timeInSeconds={0}/>
      </View>
      <View style={styles.buttonContainer}>
        <StopWatchButton
          title={'Button 1'}
          onClick={handleButtonClick}
          color={'green'}
        />
        <StopWatchButton
          title={'Button 2'}
          onClick={handleButtonClick}
          color={'green'}
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
  },
});
