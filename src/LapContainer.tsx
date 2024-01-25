import { ScrollView, StyleSheet, View } from 'react-native'
import React from 'react'
import { Lap } from './Lap'

interface LapContainerProps {
  laps: Array<string>
}

export const LapContainer = ({ laps }: LapContainerProps) => {
  return (
    <ScrollView testID='lap-list'>
      <View style={styles.lapContainer}>
        {laps.map((lapTime, index) => (
          <Lap lapTime={lapTime} key={index} />
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  lapContainer: {
    rowGap: 10
  }
})