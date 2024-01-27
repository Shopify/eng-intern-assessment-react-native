import { ScrollView, StyleSheet, View } from 'react-native'
import React from 'react'
import { Lap } from './Lap'

interface LapContainerProps {
  laps: Array<string>
}

export const LapContainer = ({ laps }: LapContainerProps) => {
  return (
    <ScrollView>
      {
        laps.length ? (
          <View style={styles.lapContainer} testID='lap-list'>
            {laps.map((lapTime, index) => (
              <Lap lapTime={lapTime} key={index} />
            ))}
          </View>
        ) : null
      }
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  lapContainer: {
    rowGap: 10
  }
})