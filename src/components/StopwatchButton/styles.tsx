import { StyleSheet } from "react-native";

export default StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    button: {
        width: 80, // Fixed width for a circular shape
        height: 80, // Fixed height for a circular shape
        borderRadius: 40, // Half of width/height to make it circular
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#333',
        marginHorizontal: 10,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
    },
    stopButton: {
        backgroundColor: '#D00',
    }
});