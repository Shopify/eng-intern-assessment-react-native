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
  test('records and displays lap times', () => {
    const { getByText, getByTestId } = render(<Stopwatch />);
    
    fireEvent.press(getByText('Start'));
    fireEvent.press(getByText('Lap'));
    expect(getByTestId('lap-list')).toContainElement(getByText(/(\d{2}:){2}\d{2}/));

    fireEvent.press(getByText('Lap'));
    expect(getByTestId('lap-list').children.length).toBe(2);
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
