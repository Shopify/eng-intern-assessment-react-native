import {StyleSheet, Text, View} from "react-native";
import {formatTime} from "../Utils";

export interface LapProps {
    title: string
    time: number

}

export default function Lap({title, time}: LapProps) {
    const displayTime = formatTime(time)
    return (
        <View style={styles.container} testID={"lap-item"}>
            <Text style={styles.text}>{title}</Text>
            <Text style={styles.text}>{displayTime}</Text>
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