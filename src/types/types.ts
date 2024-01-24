import { StyleProp, ViewStyle } from 'react-native';

// Interface for common stopwatch control functions
export interface StopwatchControlFunctions {
    onStart: () => void;
    onStop: () => void;
    onPause: () => void;
    onReset: () => void;
    onLap: () => void;
}

// Extending StopwatchControlFunctions in StopwatchProps and StopwatchButtonProps
export interface StopwatchProps extends StopwatchControlFunctions {
    fontsLoaded: boolean;
    time: number;
    laps: string[];
    showTime: boolean;
    isRunning: boolean;
    hasStarted: boolean;
}

export interface StopwatchButtonProps extends StopwatchControlFunctions {
    isRunning: boolean;
    hasStarted: boolean;
}

// Properties of an individual button
export interface ButtonProps {
    title: string;
    onPress: () => void;
    additionalStyle?: StyleProp<ViewStyle>;
}
