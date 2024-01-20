import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import StopWatch from '../src/StopWatch';

const HOUR_INDEX = 0;
const MINUTE_INDEX = 1;
const SECOND_INDEX = 2;
const MILLISECOND_INDEX = 3;

describe('Stopwatch', () => {

  beforeEach(() => {
    jest.useFakeTimers();
  });

  test('renders initial state correctly', () => {
    const { getByText, getByTestId, getAllByTestId, queryAllByTestId } = render(<StopWatch />);

    // Check each time segment separately for initial zero values
    expect(getByText('hr.')).toBeTruthy();
    expect(getByText('min.')).toBeTruthy();
    expect(getByText('sec.')).toBeTruthy();
    expect(getByText('1/10s.')).toBeTruthy();

    const hrDisplay = getByTestId('hr-display');
    const minDisplay = getByTestId('min-display');
    const secDisplay = getByTestId('sec-display');
    const msDisplay = getByTestId('ms-display');

    expect(hrDisplay.children[0]).toBe('00');
    expect(minDisplay.children[0]).toBe('00');
    expect(secDisplay.children[0]).toBe('00');
    expect(msDisplay.children[0]).toBe('00');
    
    expect(queryAllByTestId(/lap-\d/).length).toBe(0);
  });

  test('starts and stops the stopwatch', async () => {
    const { getByText, getAllByText } = render(<StopWatch />);
    const allZeros = getAllByText('00');
  
    act(() => {
      fireEvent.press(getByText('Start'));
    });
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    
    const secondsText = allZeros[SECOND_INDEX].children[0];
    expect(secondsText).not.toBe('00');
  
    act(() => {
      fireEvent.press(getByText('Pause'));
    });
  });

  it('pauses and resumes the stopwatch', async () => {
    const { getByText, getAllByText } = render(<StopWatch />);
    const allZeros = getAllByText('00');
  
    // Start the stopwatch
    act(() => {
      fireEvent.press(getByText('Start'));
    });
    act(() => {
      jest.advanceTimersByTime(2000);
    });
  
    // Pause the stopwatch
    act(() => {
      fireEvent.press(getByText('Pause'));
    });
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    const secondsText = allZeros[SECOND_INDEX].children[0];
  
    // Resume the stopwatch
    act(() => {
      fireEvent.press(getByText('Resume'));
    });
    act(() => {
      jest.advanceTimersByTime(1000);
    });
  
    // Find the time after resuming
    const resumedTime = allZeros[SECOND_INDEX].children[0];
    expect(resumedTime).not.toBe(secondsText);
  });

  test('records and displays lap times', () => {
    const { getByText, getAllByTestId } = render(<StopWatch />);
    
    act(() => {
      fireEvent.press(getByText('Start'));
    });
    act(() => {
      fireEvent.press(getByText('Lap'));
    });

    expect(getAllByTestId(/lap-\d/).length).toBe(1);

    act(() => {
      fireEvent.press(getByText('Lap'));
    });

    expect(getAllByTestId(/lap-\d/).length).toBe(2);
  });

  test('resets the stopwatch', async () => {
    const { getByText, queryAllByTestId, getAllByText } = render(<StopWatch />);
  
    act(() => {
      fireEvent.press(getByText('Start'));
    });
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    act(() => {
      fireEvent.press(getByText('Lap'));
    });
    act(() => {
      fireEvent.press(getByText('Pause'));
    });
    act(() => {
      fireEvent.press(getByText('Reset'));
    });
  
    // Check if the stopwatch has reset to initial state
    const allZeros = getAllByText('00');
    expect(allZeros.length).toBe(4);
    expect(queryAllByTestId(/lap-\d/).length).toBe(0);
  });

  test('displays the correct time', async () => {
    const { getByText, getByTestId } = render(<StopWatch />);
  
    act(() => {
      fireEvent.press(getByText('Start'));
    });
    act(() => {
      jest.advanceTimersByTime(9224055);
    });

    const hrDisplay = getByTestId('hr-display').children[0];
    const minDisplay = getByTestId('min-display').children[0];
    const secDisplay = getByTestId('sec-display').children[0];
    const msDisplay = getByTestId('ms-display').children[0];

    expect(hrDisplay).toBe('02');
    expect(minDisplay).toBe('33');
    expect(secDisplay).toBe('44');
    expect(msDisplay).toBe('55');
  
    act(() => {
      fireEvent.press(getByText('Pause'));
    });
  });

});
