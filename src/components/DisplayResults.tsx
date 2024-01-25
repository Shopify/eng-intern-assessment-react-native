import { StyleSheet, Text, View } from "react-native";
import {
    getBestTime,
    getWorstTime,
    getAverageTime,
    formatTime,
} from "../utils/time";

/**
 * Component that displays the results of the session
 */
export default function DisplayResults({ lapTimes }: { lapTimes: number[] }) {
    const bestTime = getBestTime(lapTimes) || 0;
    const worstTime = getWorstTime(lapTimes) || 0;
    const averageTime = getAverageTime(lapTimes) || 0;

    return (
        <View style={styles.container}>
            <View style={styles.timeContainer}>
                <Text style={{ ...styles.title, color: "green" }}>
                    Best Time:
                </Text>
                <Text style={styles.time}>{formatTime(bestTime)}</Text>
            </View>
            <View style={styles.timeContainer}>
                <Text style={styles.title}>Average Time:</Text>
                <Text style={styles.time}>{formatTime(averageTime)}</Text>
            </View>
            <View style={styles.timeContainer}>
                <Text style={{ ...styles.title, color: "red" }}>
                    Worst Time:
                </Text>
                <Text style={styles.time}>{formatTime(worstTime)}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 60,
    },
    timeContainer: {
        paddingVertical: 20,
        alignSelf: "center",
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
    },
    time: {
        fontSize: 20,
        alignSelf: "center",
    },
});
