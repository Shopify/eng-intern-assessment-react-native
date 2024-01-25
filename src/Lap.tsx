import { StyleSheet, Text } from 'react-native'
import React from 'react'

interface LapProps {
    lapTime: string
}

export const Lap = ({ lapTime }: LapProps) => {
  return (
    <Text style={styles.lap}>{lapTime}</Text>
  )
}

const styles = StyleSheet.create({
  lap: {
    color: "#fff",
    borderBottomColor: '#fffb',
    borderBottomWidth: 1,
    fontSize: 18
  }
})