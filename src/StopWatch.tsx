import {StyleSheet, Text, View} from 'react-native';
import {formatTime} from "./Utils";

interface StopwatchProps {
    elapsedTime: number;
}

export default function StopWatch({elapsedTime}: StopwatchProps) {
    const displayTime = formatTime(elapsedTime)
    return (
        <View style={styles.container}>
            <Text style={styles.time}>{displayTime.minutes}</Text>
            <Text style={styles.separator}>{":"}</Text>
            <Text style={styles.time}>{displayTime.seconds}</Text>
            <Text style={styles.separator}>{"."}</Text>
            <Text style={styles.time}>{displayTime.milliSeconds}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 120,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    time: {
        fontSize: 64,
        fontWeight: 'normal',
        width: 80,
        textAlign: 'center'
    },
    separator: {
        fontSize: 64,
        fontWeight: 'normal',
    },
})