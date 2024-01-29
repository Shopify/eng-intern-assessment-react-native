import React from 'react';
import { View, StyleSheet, Image, Text, TouchableWithoutFeedback } from 'react-native';

// interface for the arguments being passed
interface StopWatchButtonProps {
  imageName: string;
  title: string;
  play?: boolean;
  playCount?: number;
  setPlayCount?: (value: number) => void;
  onPress: () => void;
}

// container for all of the different icons to be used for this button component
const imagePaths: { [key: string]: any } = {
  play: require('../assets/play.png'),
  pause: require('../assets/pause.png'),
  reset: require('../assets/reset.png'),
  lap: require('../assets/lap.png'),
};

const StopWatchButton: React.FC<StopWatchButtonProps> = ({ imageName, title, play, playCount, onPress }) => {

  // helper function for handling the image
  const getImagePath = () => {
    // if playCount was passed in, return either the play or pause icon depending on state
    if (playCount !== undefined) {
      if (play) {
        return imagePaths.pause;
      } else {
        return imagePaths.play;
      }
    } 
    // otherwise, just use the imageName parameter passed in
    else {
      return imagePaths[imageName];
    }
  }

  // helper function for handling the title
  const getTitle = () => {
    // if PlayCount was passed in and timer has already started, return either 'Pause' or 'Resume' depending on the play state
    if (playCount !== undefined && playCount > 0) {
      if (play) {
        return 'Pause';
      } else {
        return 'Resume';
      }
    } 
    // otherwise, return the title parameter passed in
    else {
      return title;
    }
  }

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <Image style={styles.image} source={getImagePath()}/>
        <Text>{getTitle()}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

// Style for this button component
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100, // Set a fixed width for the circular container
    height: 100, // Set a fixed height for the circular container
    borderRadius: 50, // Make the container circular
    backgroundColor: '#ffbc14'
  },
  image: {
    width: 50, // Set the width of the image
    height: 50, // Set the height of the image
  }
})

export default StopWatchButton;