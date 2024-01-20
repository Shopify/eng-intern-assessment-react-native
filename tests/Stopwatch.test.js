import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Stopwatch from '../src/Stopwatch';

describe('Stopwatch', () => {
  test('renders initial state correctly', () => {
    const { getByText } = render(<Stopwatch />);
    
    expect(getByText('00:00:00')).toBeTruthy();
  });

  test('starts and stops the stopwatch', async () => {
    const { getByText, getByTestId } = render(<Stopwatch />);
    
    fireEvent.press(getByText('Start'));
    // Wait for some time to allow the stopwatch to update
    await new Promise(r => setTimeout(r, 2000));
  
    const timeBeforeStop = getByTestId('main-timer').props.children;
    fireEvent.press(getByText('Stop'));
    const timeAfterStop = getByTestId('main-timer').props.children;
  
    // The time should not change after stopping
    expect(timeBeforeStop).toBe(timeAfterStop);
  });
  

  test('records and displays lap times', () => {
    const { getByText, getAllByText } = render(<Stopwatch />);
    
    fireEvent.press(getByText('Start'));
    fireEvent.press(getByText('Lap'));
    // At least one lap time should be visible
    expect(getAllByText(/(\d{2}:){2}\d{2}/).length).toBeGreaterThan(0);

    fireEvent.press(getByText('Lap'));
    // Expect more than one lap time
    expect(getAllByText(/(\d{2}:){2}\d{2}/).length).toBeGreaterThan(1);
  });

  test('resets the stopwatch', () => {
    const { getByText, getByTestId } = render(<Stopwatch />);
    
    fireEvent.press(getByText('Reset'));
    fireEvent.press(getByText('Start'));
    fireEvent.press(getByText('Lap'));

    expect(getByTestId('main-timer')).toBeTruthy();
  });
});
