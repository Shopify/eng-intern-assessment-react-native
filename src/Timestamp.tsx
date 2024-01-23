import { Text, StyleSheet, View } from "react-native";
import { formatTimestamp } from "./utils";

const Timestamp = ({ time, visible }: { time: number[], visible: boolean }) => {
    return (
        <View style={styles.container}>
            {visible && <Text style={styles.timestamp}>{formatTimestamp(time)}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 30, 
        width: 150, 
    },
    timestamp: {
        fontSize: 24, 
        textAlign: "center"
    }
})

export default Timestamp;