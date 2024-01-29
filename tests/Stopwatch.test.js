import React from 'react';
import { render, fireEvent, act, findAllByTestId } from '@testing-library/react-native';
import Stopwatch from '../src/Stopwatch';

describe('Stopwatch', () => {
  test('renders initial state correctly', () => {
    const { getByText, queryByTestId } = render(<Stopwatch />);
    
    expect(getByText('00:00:00.00')).toBeTruthy();
    expect(queryByTestId('lapTime')).toBeNull();
  });

  test('starts and stops the stopwatch', () => {
    const { getByText, queryByText } = render(<Stopwatch />);
    
    fireEvent.press(getByText('Start'));
    expect(queryByText(/(\d{2}:){2}\d{2}/)).toBeTruthy();

    fireEvent.press(getByText('Stop'));
    expect(queryByText(/(\d{2}:){2}\d{2}/)).toBeTruthy();
  });

  test('pauses and resumes the stopwatch', async () => { //changed button labels to Start/Stop as they serve the same function as pause/resume
    const { getByText } = render(<Stopwatch />);
    
    await act(async()=>{

      fireEvent.press(getByText('Start'));
      await new Promise((resolve) =>setTimeout(resolve, 100))
      fireEvent.press(getByText('Stop'));

      const pausedTime = await getByText(/(\d{2}:){2}\d{2}/).children.join;
  
      fireEvent.press(getByText('Start'));

      await new Promise((resolve) =>setTimeout(resolve, 100))

      expect( await getByText(/(\d{2}:){2}\d{2}/).textContent).not.toBe(pausedTime);
    })
  });
  test('records and displays lap times', async () => {
    const { getByText, getByTestId } = render(<Stopwatch />);
    
    await act(async () => {
        fireEvent.press(getByText('Start'));
        await new Promise((resolve) => setTimeout(resolve, 100));
        fireEvent.press(getByText('Lap'));

        await new Promise((resolve) => setTimeout(resolve, 100));
        fireEvent.press(getByText('Lap'));

        await new Promise((resolve) => setTimeout(resolve, 100));
        fireEvent.press(getByText('Stop'));
    });

    // Attempt to retrieve lap time elements individually
    const lap1 = getByTestId('lap-time-0');
    const lap2 = getByTestId('lap-time-1');

    // Verify the content of each lap
    expect(lap1.props.children.join('')).toMatch(/Lap 1: (\d{2}:){2}\d{2}\.\d{2}/);
    expect(lap2.props.children.join('')).toMatch(/Lap 2: (\d{2}:){2}\d{2}\.\d{2}/);
  });

  test('resets the stopwatch', () => {
    const { getByText, queryByTestId } = render(<Stopwatch />);
    
    fireEvent.press(getByText('Start'));
    fireEvent.press(getByText('Lap'));
    fireEvent.press(getByText('Reset'));

    expect(getByText('00:00:00.00')).toBeTruthy();
    expect(queryByTestId('lapTime')).toBeNull();
  });
});
