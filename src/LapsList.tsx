import { View, Text, ScrollView } from 'react-native';
import React from 'react';

interface LapsListProps {
  laps: number[];
}

export default function LapsList({ laps }: LapsListProps) {
  return (
    <View>
        {laps.length > 0 && 
        <View>
            <Text>Laps:</Text>
            <View testID="lap-list">
                    {laps.map((lapTime, index) => (
                        <Text key={index} >{`Lap ${index + 1}: ${formattedTime(lapTime)}`}</Text>
                    ))}
            </View>
        </View>
        }
    </View>
  );
}

function formattedTime(timeInSeconds: number) {
    const hours = Math.floor(timeInSeconds/3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    const formattedTime = `${padWithZero(hours)}:${padWithZero(minutes)}:${padWithZero(seconds)}`
    return formattedTime
  }
  
  function padWithZero(value: number) {
    return value < 10 ? `0${value}` : `${value}`
  }