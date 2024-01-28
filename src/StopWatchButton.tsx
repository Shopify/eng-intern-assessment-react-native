import React from 'react';
import { Button, GestureResponderEvent } from 'react-native';

export default function StopWatchButton({ title, onPress } : {
  title: string; 
  onPress: (event: GestureResponderEvent) => void;
}) {
  return (
    <Button 
      onPress={onPress}
      title={title}
    />
  );
}