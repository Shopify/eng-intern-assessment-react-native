import {Text} from "react-native";

const Formatted = (props: any) => {
    const millisecondsTime = props.time;

    const minutes = Math.floor(millisecondsTime / 60000);
    const seconds = Math.floor((millisecondsTime % 60000) / 1000);
    const milliseconds = Math.floor((millisecondsTime % 1000) / 10);


    const format = () => {
        return String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0") + ":" + String(milliseconds).padStart(2, "0");
    }

    return(
        <>
            <Text style={props.style}>{format()}</Text>
        </>
    )
}

export default Formatted;