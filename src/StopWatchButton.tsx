import { View } from 'react-native';
import { Button } from '@shopify/polaris'

// Define the props interface for the StopWatchButton component
interface StopWatchButtonProps {
  onStart: () => void;    // Function to be called when the Start button is clicked
  onStop: () => void;     // Function to be called when the Stop button is clicked
  onReset: () => void;    // Function to be called when the Reset button is clicked
  onRecordLap: () => void; // Function to be called when the Lap button is clicked
}

// Define the StopWatchButton component that takes in the specified props
export default function StopWatchButton({
  onStart,
  onStop,
  onReset,
  onRecordLap,
}: StopWatchButtonProps) {
  return (
    <View>
      {/* Button for starting the stopwatch, onClick triggers the onStart function */}
      <Button onClick={onStart}>Start</Button>
      {/* Button for stopping the stopwatch, onClick triggers the onStop function */}
      <Button onClick={onStop}>Stop</Button>
      {/* Button for resetting the stopwatch, onClick triggers the onReset function */}
      <Button onClick={onReset}>Reset</Button>
      {/* Button for recording a lap, onClick triggers the onRecordLap function */}
      <Button onClick={onRecordLap}>Lap</Button>
    </View>
  );
}