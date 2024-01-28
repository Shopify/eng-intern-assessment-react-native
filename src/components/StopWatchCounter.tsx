import { StyleSheet, Text, View } from "react-native";
import { swState } from "../utils/StopWatchCounterState";
import { useEffect, useState } from "react";
import { act } from "react-test-renderer";
import { theme } from "../data/theme";


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
