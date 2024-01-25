import { StyleSheet, View } from "react-native";
import StopWatch from "./src/StopWatch";

export default function App() {
    return (
        <View style={styles.container}>
            <StopWatch />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#e0e0e0",
        alignItems: "center",
        justifyContent: "center",
    },
    buttonContainer: {
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-around",
        width: "80%",
    },
});
