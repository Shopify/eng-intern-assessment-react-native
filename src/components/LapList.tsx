import {ScrollView, StyleSheet, Text, View} from "react-native";
import React from "react";
import {formatTime} from "../common/TimeFormatter";

export interface LapModel {
    title: string
    time: number

}

interface LapGroupProps {
    laps: LapModel[]
}

export default function LapList({laps}: LapGroupProps) {
    return (

        <ScrollView testID={"lap-list"}>
            {laps.map((lap, index) => (
                <View key={index} style={styles.container} testID={"lap-item"}>
                    <Text style={styles.text}>{lap.title}</Text>
                    <Text style={styles.text}>{formatTime(lap.time)}</Text>
                </View>
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 10,
    },

    text: {
        fontSize: 16,
        color: 'white'
    },
})