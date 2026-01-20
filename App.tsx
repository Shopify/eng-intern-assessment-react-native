import {SafeAreaView, StyleSheet} from 'react-native';
import StopWatch from "./src/StopWatch";
import React from "react";

export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            <StopWatch/>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'black'
    }
})