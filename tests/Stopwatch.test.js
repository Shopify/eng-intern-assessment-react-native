import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Stopwatch from '../src/Stopwatch';

describe('Stopwatch', () => {
  test('renders initial state correctly', () => {
    const { getByText, queryByTestId } = render(<Stopwatch />);
    
    expect(getByText('00:00:00')).toBeTruthy();
    expect(queryByTestId('lap-list')).toBeNull();
  });

  test('starts and stops the stopwatch', async() => {
    const { getByText, queryByText } = render(<Stopwatch />);
    
    fireEvent.press(getByText('Start'));
    expect(queryByText(/(\d{2}:){2}\d{2}/)).toBeTruthy();
    await new Promise((resolve) => setTimeout(resolve, 100));
    fireEvent.press(getByText('Stop'));
    const stoppedTime = queryByText(/(\d{2}:){2}\d{2}/);
    expect(stoppedTime).toBeTruthy(); // Edit: The time display should still be present instead of null
    // I will be using children[0] instead of textcontext to ensure proper comparison
    // Check if the time displayed remains constant after stopping
    await new Promise((resolve) => setTimeout(resolve, 100));    
    expect(queryByText(/(\d{2}:){2}\d{2}/).children[0]).toBe(stoppedTime.children[0]);
  });
  
  test('pauses and resumes the stopwatch', async() => {
    const { getByText, queryByText } = render(<Stopwatch />);
    
    fireEvent.press(getByText('Start'));
    await new Promise(resolve => setTimeout(resolve, 100));
    fireEvent.press(getByText('Stop')); // Stop and Pause are essentially the same buttons
    const pausedTime = queryByText(/(\d{2}:){2}\d{2}/).children[0];
    
    fireEvent.press(getByText('Resume'));
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(queryByText(/(\d{2}:){2}\d{2}/).children[0]).not.toBe(pausedTime);
  });

  test('records and displays lap times', () => {
    const { getByText, getByTestId } = render(<Stopwatch />);
    
    fireEvent.press(getByText('Start'));
    fireEvent.press(getByText('Lap'));
    expect(getByTestId('lap-list').children[0].children[0].children.length).toBe(1);
    
    fireEvent.press(getByText('Lap'));
    expect(getByTestId('lap-list').children[0].children[0].children.length).toBe(2);
  });

  test('resets the stopwatch', () => {
    const { getByText, queryByTestId } = render(<Stopwatch />);
    
    fireEvent.press(getByText('Start'));
    fireEvent.press(getByText('Lap'));
    fireEvent.press(getByText('Reset'));

    expect(getByText('00:00:00')).toBeTruthy();
    expect(queryByTestId('lap-list')).toBeNull();
  });
});
