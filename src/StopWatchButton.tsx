import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';

// Get the screen width
const screenWidth = Dimensions.get('window').width;

interface StopWatchButtonProps {
    label: string; 
    onPress: () => void; 
    buttonStyle?: object;
    disabled?: boolean; 
}

export default function StopWatchButton({ label, onPress, buttonStyle, disabled }: StopWatchButtonProps) {
    return (
        <TouchableOpacity
            style={[styles.button, buttonStyle, disabled && styles.disabledButton]}
            onPress={onPress}
            disabled={disabled}>
            <Text style={[styles.buttonText, disabled && styles.disabledButtonText]}>
                {label}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    // Base style for the button
    button: {
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 20,
        marginRight: 10,
        width: screenWidth * 0.35, // Fixed width for uniformity
        alignItems: 'center',
        justifyContent: 'center',
    },
    // Style for the button text
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    // Style modifications when the button is disabled
    disabledButton: {
        backgroundColor: 'black',
        borderColor: 'grey',
    },
    // Style for text when the button is disabled
    disabledButtonText: {
        color: 'grey',
    },
});
