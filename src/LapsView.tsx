import { ScrollView, StyleSheet, Text, View } from "react-native";
import { INITIAL_TIMER_STATE, TimerState, formatTime } from "../App";
import React from "react";
import uuid from 'react-native-uuid';

function timerText(timerInfo: TimerState) {
    if(timerInfo == INITIAL_TIMER_STATE) return
    const timeStr = formatTime(timerInfo);
    return <Text style={styles.text}>{timeStr}</Text>
}

export default function LapsView(
    timerInfo: TimerState,
    lapData: string[], 
) {  
    return <ScrollView>
        {timerText(timerInfo)}
        {lapData.map((lap) => {
            return (
                <View key={uuid.v4().toString()} style={styles.fullWidth}>
                    <View style={styles.divider} />
                        <Text style={styles.text}>{lap}</Text>
                </View>
            )
        })}
    </ScrollView>
}
  
const styles = StyleSheet.create({
    text: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'black',
    },
    divider: {
      backgroundColor: 'gray',
      marginVertical: 5,
      height: 2,
    },
    fullWidth: {
        width: '100%',
    },
});
  