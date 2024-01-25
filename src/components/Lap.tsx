import {StyleSheet, Text, View} from "react-native";
import {formatTime} from "../Utils";

interface LapProps {
    label: string
    time: number

}

export default function Lap({label, time}: LapProps) {
    const displayTime = formatTime(time)
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{label}</Text>
            <Text
                style={styles.text}>{`${displayTime.minutes}:${displayTime.seconds}:${displayTime.milliSeconds}`}</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    text: {
        fontSize: 16,
    }
})