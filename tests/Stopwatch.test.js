import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Stopwatch from '../src/Stopwatch';

describe('Stopwatch', () => {
  test('renders initial state correctly', () => {
    const { getByText, queryByTestId } = render(<Stopwatch />);
    
    expect(getByText('00:00:00')).toBeTruthy();
    expect(queryByTestId('lap-list')).toBeNull();
  });

  test('starts and stops the stopwatch', async () => {
    const { getByText, getByTestId } = render(<Stopwatch />);
    
    fireEvent.press(getByText('Start'));
    const timerTextElement = getByTestId('timer-text');
    const expectedFormat = /(\d{2}:){2}\d{2}/;
    expect(timerTextElement.props.children).toMatch(expectedFormat);

    fireEvent.press(getByText('Stop'));
    const stoppedTime = getByTestId('timer-text').props.children;
    // Introduce a delay of 3000 milliseconds (adjust as needed)
    await new Promise(resolve => setTimeout(resolve, 3000));
    const currentTime = getByTestId('timer-text').props.children;
    // Time should exactly match
    expect(stoppedTime).toEqual(currentTime);
  });

  test('pauses and resumes the stopwatch', async () => {
    const { getByText, getByTestId } = render(<Stopwatch />);
    
    fireEvent.press(getByText('Start'));
    fireEvent.press(getByText('Stop')); // Stop and Pause is the same thing
    const pausedTime = getByTestId('timer-text').props.children;
    console.log(pausedTime);

    fireEvent.press(getByText('Resume'));
    await new Promise(resolve => setTimeout(resolve, 1000));
    const resumedTime = getByTestId('timer-text').props.children;
    expect(resumedTime).not.toEqual(pausedTime);
  });

  test('records and displays lap times', () => {
    const { getByText, getByTestId } = render(<Stopwatch />);
    
    fireEvent.press(getByText('Start'));
    fireEvent.press(getByText('Lap'));
    expect(getByTestId('lap-list').props.data.length).toBe(1);
    const laptime = getByTestId('lap-item').props.children;
    const expectedFormat = /(\d{2}:){2}\d{2}/;
    expect(laptime).toMatch(expectedFormat);

    fireEvent.press(getByText('Lap'));
    expect(getByTestId('lap-list').props.data.length).toBe(2);
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
