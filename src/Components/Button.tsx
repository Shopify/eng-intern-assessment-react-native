import React from 'react';
import { TouchableOpacity, Text, StyleSheet, PressableProps } from 'react-native';

interface Button extends PressableProps {
 title: string;
 color: string;
}

const Button: React.FC<Button> = ({ onPress, title, color }) => (
 <TouchableOpacity onPress={onPress} style={[styles.button, { backgroundColor: color }]}>
    <Text style={styles.text}>{title}</Text>
 </TouchableOpacity>
);

const styles = StyleSheet.create({
 button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 5,
    margin: 15,
    width:  200
    
 },
 text: {
    color: '#fff',
    fontSize: 16,
 },
});

export default Button;
