// import { View } from 'react-native';

// export default function StopWatchButton() {
//   return (
//     <View >
//     </View>
//   );
// }
// src/StopwatchButton.tsx
// src/StopwatchButton.tsx
import React from 'react';
import { View, Button } from 'react-native';

type StopwatchButtonProps = {
  isRunning: boolean;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
  onLap: () => void;
};

const StopwatchButton: React.FC<StopwatchButtonProps> = ({ isRunning, onStart, onStop, onReset, onLap }) => {
  return (
    <View>
      {isRunning ? (
        <Button title="Stop" onPress={onStop} />
      ) : (
        <Button title="Start" onPress={onStart} />
      )}
      <Button title="Lap" onPress={onLap} disabled={!isRunning} />
      <Button title="Reset" onPress={onReset} />
    </View>
  );
};

export default StopwatchButton;

