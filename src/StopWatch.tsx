import React from 'react';
import { Text, SafeAreaView } from 'react-native';
import StopWatchButton from "./StopWatchButton";

export default function StopWatch() {
  const handleButtonClick = (buttonTitle: string) => {
    console.log(`${buttonTitle} pressed`);
  };

  return (
    <SafeAreaView>
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
    </SafeAreaView>
  );
}
