import {StyleSheet, View} from "react-native";
import React from "react";


export default function LapSeparator() {
    return <View
        style={[styles.container]}>
        <View style={styles.line}/>
    </View>
}


const styles = StyleSheet.create({
    container: {
        height: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

    line: {
        height: 0.5,
        width: '100%',
        backgroundColor: 'gray',
    }
})