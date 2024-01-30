import { DimensionValue, Insets } from "react-native";
import { StopwatchButtonActionTypes } from "./StopwatchButtonActionTypes";

//The stopwatch button takes in as input the following:
//action: the type of the button, what it does
//onPress: the function which is executes on press
//height: adjustable height if needed
//width: adjustable width if needed
//buttonColor: adjustable button color if needed, default is light blue
//buttonBorderColor: adjustable border color if needed, default is shade of light blue
//isDisabled: boolean to disable the button if needed
//hitslop: adjustable hitslop, default is 20
export interface StopWatchButtonProps {
    action: StopwatchButtonActionTypes
    onPress(): void;

    height?: DimensionValue;
    width?: DimensionValue;

    buttonColor?: string;
    buttonBorderColor?: string;

    borderRadius?: number;
    bottomBorderWidth?: number;

    isDisabled?: boolean;
    hitslop?: Insets;
}