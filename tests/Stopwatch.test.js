import React from 'react';
import { render, fireEvent, act, within } from '@testing-library/react-native'
import App from '../App';

describe('Stopwatch', () => {
  test('renders initial state correctly', () => {
    const { getByText, queryByTestId } = render(<App />);
    
    expect(getByText('00:00:00')).toBeTruthy();
    expect(queryByTestId('lap-list')).toBeNull();
  });

  test('starts and stops the stopwatch', () => {
  
    const { getByText, queryByText } = render(<App />);
    
    fireEvent.press(getByText('Start'));

    expect(queryByText(/(\d{2}:){2}\d{2}/)).toBeTruthy();

    fireEvent.press(getByText('Stop'));

    expect(queryByText(/(\d{2}:){2}\d{2}/)).toBeNull();
  });
  
  test('pauses and resumes the stopwatch', async () => {
    jest.useFakeTimers();
    const { getAllByText, getByText } = render(<App />);
    
    fireEvent.press(getByText('Start'));
  
    act( () => {
      jest.advanceTimersByTime(1000);
    });
    fireEvent.press(getByText('Pause'));
    const pausedTime = getAllByText(/(\d{2}:){2}\d{2}/)[0].props.children;
  
    act( () => {
      jest.advanceTimersByTime(2000);
    });

    fireEvent.press(getByText('Resume'));

    act( () => {
      jest.advanceTimersByTime(1000);
    });

    const newUnPausedTime = getAllByText(/(\d{2}:){2}\d{2}/)[0].props.children;
  
    expect(newUnPausedTime !== pausedTime);
  });

  test('records and displays lap times', () => {
    jest.useFakeTimers();
  
    const { getByText, getByTestId } = render(<App />);

    fireEvent.press(getByText('Start'));

    // Advance timer by 1 second
    act( () => {
      jest.advanceTimersByTime(1000);
    });

    fireEvent.press(getByText('Lap'));
  
    // Query within the 'lap-list' element
    const lapList = getByTestId('lap-list');
    
    // Retrieve all lap time components
    const lapTimeComponents = within(lapList).getAllByText(/(\d{2}:){2}\d{2}/);
  
    const latestLapTimeText = lapTimeComponents[0].props.children;
  
    expect(latestLapTimeText).toBe("00:01:00");
  
    // Advance timer by 3 seconds
    act( () => {
      jest.advanceTimersByTime(3000);
    });
    fireEvent.press(getByText('Lap'));
  
    // Check if the number of lap times recorded is as expected
    const updatedLapTimeComponents = within(lapList).getAllByText(/(\d{2}:){2}\d{2}/);
    expect(updatedLapTimeComponents.length).toBe(2);
  });
  
  

  test('resets the stopwatch', () => {
    const { getByText, queryByTestId } = render(<App />);
    
    fireEvent.press(getByText('Start'));
    fireEvent.press(getByText('Lap'));
    fireEvent.press(getByText('Reset'));

    expect(getByText('00:00:00')).toBeTruthy();
    expect(queryByTestId('lap-list')).toBeNull();
  });
});
