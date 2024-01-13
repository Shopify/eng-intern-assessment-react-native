import React from 'react';
import { Button, View } from 'react-native';

type Props = {
  title: string;
  onPress: () => void;
};

const StopWatchButton: React.FC<Props> = ({ title, onPress }) => {
  return (
    <View>
      <Button title={title} onPress={onPress} />
    </View>
  );
};

export default StopWatchButton;
