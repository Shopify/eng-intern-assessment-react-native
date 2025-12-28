import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import Stopwatch from '../src/Stopwatch';

describe('Stopwatch', () => {
  test('renders initial state correctly', () => {
    const { getByText, queryByTestId } = render(<Stopwatch />);
    
    expect(getByText('00:00:00')).toBeTruthy();
    expect(queryByTestId('lap-list')).toBeNull();
  });

  test('starts and stops the stopwatch', async () => {
    const { getByText, queryByText } = render(<Stopwatch />);
    
    act(() => {
      fireEvent.press(getByText('Start'));
    });
    expect(queryByText(/(\d{2}:){2}\d{2}/)).toBeTruthy();
  
    await act(async () => {
      // Simulate a delay
      await new Promise((r) => setTimeout(r, 1000));
  
      fireEvent.press(getByText('Stop'));
    });
  
    expect(queryByText(/(\d{2}:){2}\d{2}/)).toBeTruthy();
  });

  test('pauses and resumes the stopwatch', async () => {
    const { getByText } = render(<Stopwatch />);
    
    fireEvent.press(getByText('Start'));
    fireEvent.press(getByText('Stop'));
    const pausedTime = getByText(/(\d{2}:){2}\d{2}/).props.children;

    fireEvent.press(getByText('Start'));
    await act(() => jest.advanceTimersByTime(1000));
    expect(getByText(/(\d{2}:){2}\d{2}/).props.children).not.toBe(pausedTime);
  });


  test('records and displays lap times', async () => {
    const { getByText, getByTestId } = render(<Stopwatch />);
    
    fireEvent.press(getByText('Start'));
    fireEvent.press(getByText('Lap'));

    expect(getByTestId('lap-list').children.length).toBe(2);
  });

  test('resets the stopwatch', () => {
    const { getByText, queryByTestId } = render(<Stopwatch />);
    
    // Start and then stop the stopwatch to make the "Reset" button visible
    fireEvent.press(getByText('Start'));
    fireEvent.press(getByText('Stop'));
    fireEvent.press(getByText('Reset'));
  
    expect(getByText('00:00:00')).toBeTruthy();
    expect(queryByTestId('lap-list')).toBeNull();
  });
});
