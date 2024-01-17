import React, { View } from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import StopWatch from '../src/components/StopWatch';

describe('Stopwatch', () => {

  test('renders initial state correctly', () => {
    const { getByTestId } = render(<StopWatch />);
  
    expect(getByTestId('stopwatch-text')).toBeTruthy();
    const lapList = getByTestId('lap-list');
  
    // Check if the ScrollView has any children that are lap items
    expect(lapList.findAllByType(View)).toHaveLength(0);
  });

  test('starts and stops the stopwatch', () => {
    const { queryByText, getByTestId } = render(<StopWatch />);
    
    fireEvent.press(getByTestId('start-stop')); // Start
    expect(queryByText(/(\d{2}:){2}\d{2}/)).toBeTruthy();

    fireEvent.press(getByTestId('start-stop')); // Stop
    expect(queryByText(/(\d{2}:){2}\d{2}/)).toBeTruthy();
  });

  test('pauses and resumes the stopwatch', () => {
    const { getByText, getByTestId } = render(<StopWatch />);
    
    fireEvent.press(getByTestId('start-stop')); // Start 
    fireEvent.press(getByTestId('start-stop')); // Stop
    const pausedTime = getByText(/(\d{2}:){2}\d{2}/).children.join("");;

    fireEvent.press(getByTestId('start-stop')); // Start Again
    expect(getByText(/(\d{2}:){2}\d{2}/).textContent).not.toBe(pausedTime);
  });

  test('records and displays lap times', () => {
    const { getByTestId, queryAllByText } = render(<StopWatch />);

    fireEvent.press(getByTestId('start-stop')); // Start 
    fireEvent.press(getByTestId('lap-reset')); // Lap (1)
  
    // Query all elements that match the lap time format
    let lapTimes = queryAllByText(/(\d{2}:){2}\d{2}/);
    // Expect 1 lap time to be present (1 lap + the timer)
    expect(lapTimes).toHaveLength(2);
  
    fireEvent.press(getByTestId('lap-reset')); // Lap (2)
  
    // Query again for all lap times
    lapTimes = queryAllByText(/(\d{2}:){2}\d{2}/);
    // Expect 2 lap times to be present (2 laps + the timer)
    expect(lapTimes).toHaveLength(3);
  });

  test('resets the stopwatch', () => {
    const { getAllByText, queryAllByText, getByTestId } = render(<StopWatch />);
    
    fireEvent.press(getByTestId('start-stop')); // Start
    fireEvent.press(getByTestId('lap-reset')); // Lap 
    fireEvent.press(getByTestId('start-stop')); // Stop (Reset button appears)
    fireEvent.press(getByTestId('lap-reset')); // Reset

    expect(getAllByText('00:00:00')).toBeTruthy();
    let lapTimes = queryAllByText(/(\d{2}:){2}\d{2}/);
    // Expect 0 lap times to be present (0 laps + the timer)
    expect(lapTimes).toHaveLength(1);
  });
});
