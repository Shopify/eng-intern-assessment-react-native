import { Text } from 'react-native'
import React from 'react'

interface LapProps {
    lapTime: string
}

export const Lap = ({ lapTime }: LapProps) => {
  return (
    <Text>{lapTime}</Text>
  )
}