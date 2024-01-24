import { ScrollView } from 'react-native'
import React from 'react'
import { Lap } from './Lap'

interface LapContainerProps {
  laps: Array<string>
}

export const LapContainer = ({ laps }: LapContainerProps) => {
  return (
    <ScrollView>
        {
            laps.map((lapTime, index) => (
              <Lap lapTime={lapTime} key={index} />
            ))
        }
    </ScrollView>
  )
}