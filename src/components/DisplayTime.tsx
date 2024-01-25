import { StyleSheet, Text, View } from "react-native";

export default function DisplayTime({ time }: { time: string }) {
    const [minutes, seconds, milliseconds] = time.split(":");

    return (
        <View style={styles.container}>
            <View style={styles.timeContainer}>
                <Text style={styles.time}>{minutes}</Text>
            </View>
            <Text style={styles.separator}>:</Text>
            <View style={styles.timeContainer}>
                <Text style={styles.time}>{seconds}</Text>
            </View>
            <Text style={styles.separator}>:</Text>
            <View style={styles.timeContainer}>
                <Text style={styles.time}>{milliseconds}</Text>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: "auto",
    },
    separator: {
        fontSize: 50,
    },
    timeContainer: {
        flexDirection: "row",
        width: 63,
        justifyContent: "center",
        alignItems: "center",
    },
    time: {
        fontSize: 50,
        alignSelf: "center",
    },
});
