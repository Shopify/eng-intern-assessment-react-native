import React from 'react';
import { Button } from 'react-native';

interface StopwatchButtonProps {
  title: string;
  onPress: () => void;
}

const StopwatchButton: React.FC<StopwatchButtonProps> = ({ title, onPress }) => {
  return (
    <Button title={title} onPress={onPress} />
  );
}

export default StopwatchButton;