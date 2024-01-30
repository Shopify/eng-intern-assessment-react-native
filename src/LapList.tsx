import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

// Declares props that will be used by the StopWatch Buttons
type Props = {

    // List that keeps track of the laps
    laps: number[];
};
  
  export const LapList: React.FC<Props> = ({ laps }) => {
    const reversedLaps = [...laps].reverse();
    const renderItem = ({ item, index }: { item: number; index: number }) => (

    // Display the times of the laps 
      <View style={styles.lapItem}>
        <Text>{`Lap ${reversedLaps.length - index}: ${formatTime(item)}`}</Text>
      </View>

    );
  
    // Format the time of the laps in HH:MM:SS format
    const formatTime = (time: number): string => {
        const hours = Math.floor(time / (1000 * 60 * 60)).toString().padStart(2, '0');
        const minutes = Math.floor(time / (1000 * 60)).toString().padStart(2, '0');
        const seconds = Math.floor((time % (1000 * 60)) / 1000).toString().padStart(2, '0');
        const milliseconds = (time % 1000).toString().padStart(3, '0').slice(0, 2);
        return `${hours}:${minutes}:${seconds}.${milliseconds}`;
    };
  
    return (
    
    
        // List of the Laps using FlatList
        <View style={styles.lapListContainer}>
            <FlatList
                data={reversedLaps}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                style={styles.lapList}
            />
        </View>
    );

  };
  
  // LapList Styles
  const styles = StyleSheet.create({
    lapListContainer: {
      marginTop: 10,
      flex: 1,
      width: '100%',
  
    },
    
    lapList: {
      width: '100%',
    },

    lapItem: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },

});