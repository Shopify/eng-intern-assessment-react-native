import {StyleSheet, Text, View} from 'react-native';
import {formatTime} from "./Utils";

interface StopwatchProps {
    elapsedTime: number;
}

export default function StopWatch({elapsedTime}: StopwatchProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.time}>{formatTime(elapsedTime)}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 120
    },
    time: {
        fontSize: 64,
        fontWeight: 'bold',
    },
});