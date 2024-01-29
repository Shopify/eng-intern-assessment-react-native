import { View, StyleSheet, ImageBackground, Text, Image } from 'react-native';
import StopWatchButton from './StopWatchButton';
import { useState } from 'react';


export default function StopWatch() {
  // initialize state variables
  const [play, setPlay] = useState(false);
  const [playCount, setPlayCount] = useState(0);

  // handler function for play state
  const handlePlay = () => {
    setPlay((prevPlay) => !prevPlay);
    setPlayCount((prevCount) => prevCount + 1);
  }

  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/mobile-background.png")}
    >
      <View >
        <Text></Text>
        <View style={styles.buttonContainer}>
          <StopWatchButton 
            imageName="reset"
            title="Reset"
            onPress={() => console.log('Stop Button')}
          />
          <StopWatchButton 
            imageName="play"
            title="Start"
            play={play}
            playCount={playCount}
            onPress={handlePlay}
          />
          <StopWatchButton 
            imageName="lap"
            title="Lap"
            onPress={() => console.log('Stop Button')}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
      flex: 1,
      justifyContent: "flex-end",
      width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row', // Arrange items horizontally
    justifyContent: 'space-around', // Add space between items
    paddingHorizontal: 16, // Add some horizontal padding
    marginBottom: '30%', // Add some marginBottom if needed
  },
})