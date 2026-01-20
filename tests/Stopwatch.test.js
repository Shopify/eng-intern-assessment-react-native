import React from 'react';
import {render, fireEvent, act, within} from '@testing-library/react-native';
import Stopwatch from '../src/Stopwatch';

describe('Stopwatch', () => {
    test('renders initial state correctly', () => {
        const {getByText, queryByTestId} = render(<Stopwatch/>);

        expect(getByText('00:00:00')).toBeTruthy();
        expect(queryByTestId('lap-list')).toBeNull();
    });

    test('starts and stops the stopwatch', () => {
        const {getByText, queryByText} = render(<Stopwatch/>);

        fireEvent.press(getByText('Start'));
        expect(queryByText(/(\d{2}:){2}\d{2}/)).toBeTruthy();

        fireEvent.press(getByText('Stop'));
        expect(queryByText(/(\d{2}:){2}\d{2}/)).not.toBeNull();
    });

    test('pauses and resumes the stopwatch', async () => {
        const {getByText} = render(<Stopwatch/>);

        await act(async () => {

            fireEvent.press(getByText('Start'));
            await new Promise((resolve) => setTimeout(resolve, 10))
            fireEvent.press(getByText('Stop'));

            const pausedTime = getByText(/(\d{2}:){2}\d{2}/).children.join();

            fireEvent.press(getByText('Start'));
            await new Promise((resolve) => setTimeout(resolve, 10))

            expect(getByText(/(\d{2}:){2}\d{2}/).children.join()).not.toBe(pausedTime);
        })
    });

    test('records and displays lap times', async () => {
        const {getByText, getByTestId} = render(<Stopwatch/>);

        await act(async () => {
            fireEvent.press(getByText('Start'));

            await new Promise((resolve) => setTimeout(resolve, 10))

            await fireEvent.press(getByText('Lap'));


            const lapList = getByTestId("lap-list");

            expect(lapList).toBeDefined()


            fireEvent.press(getByText('Lap'));

            const {queryAllByText: queryAllByTextWithinFlatList} = within(lapList);

            const matchingElements = queryAllByTextWithinFlatList(/(\d{2}:){2}\d{2}/);

            expect(matchingElements.length).toBe(2);

        })
    });

    test('resets the stopwatch', () => {
        const {getByText, queryByTestId} = render(<Stopwatch/>);

        fireEvent.press(getByText('Start'));
        fireEvent.press(getByText('Lap'));
        fireEvent.press(getByText('Reset'));

        expect(getByText('00:00:00')).toBeTruthy();
        expect(queryByTestId('lap-list')).toBeNull();
    });
});
