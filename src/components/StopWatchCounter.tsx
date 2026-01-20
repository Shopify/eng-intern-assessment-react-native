import { StyleSheet, Text, View } from "react-native";
import { swState } from "../utils/StopWatchCounterState";
import { useEffect, useState } from "react";
import { theme } from "../data/theme";

/**
 * StopWatchCounter
 * @author Vivian Dai
 * Component at the top for displaying the current time on stopwatch
 */
export default function StopWatchCounter() {
    const [timeString, setTimeString] = useState<string>(swState.toTimeString());
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeString(swState.toTimeString());
        }, 1);
      
        return () => clearInterval(interval);
      }, []);
    return (
        <View>
            <Text style={styles.text}>{timeString}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 50,
        textAlign: 'center',
        color: theme.text,
    },
});
