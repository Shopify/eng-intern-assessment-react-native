import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Stopwatch from "../src/Stopwatch";

describe("Stopwatch", () => {
  test("renders initial state correctly", () => {
    const { queryByTestId, getByText } = render(<Stopwatch />);

    expect(getByText("00:00:00")).toBeTruthy();
    expect(queryByTestId("lap-list")).toBeNull();
  });

  test("starts and stops the stopwatch", () => {
    const { queryByText, queryByTestId } = render(<Stopwatch />);

    // Start
    fireEvent.press(queryByTestId("start-stop"));
    expect(queryByText(/(\d{2}:){2}\d{2}/)).toBeTruthy();

    // Stop
    fireEvent.press(queryByTestId("start-stop"));
    expect(queryByText(/(\d{2}:){2}\d{2}/)).toBeTruthy();
  });

  test("pauses and resumes the stopwatch", () => {
    const { getByText, queryByTestId } = render(<Stopwatch />);

    // Start
    fireEvent.press(queryByTestId("start-stop"));
    // Stop
    fireEvent.press(queryByTestId("start-stop"));
    const pausedTime = getByText(/(\d{2}:){2}\d{2}/).children.join();

    // Start again
    fireEvent.press(queryByTestId("start-stop"));
    expect(getByText(/(\d{2}:){2}\d{2}/).textContent).not.toBe(pausedTime);
  });

  test("records and displays lap times", () => {
    const { queryAllByText, getByTestId, getByText } = render(<Stopwatch />);

    // Start
    fireEvent.press(getByTestId("start-stop"));
    // Lap 1
    fireEvent.press(getByTestId("lap-reset"));

    let lapTime = queryAllByText(/(\d{2}:){2}\d{2}/);
    // Lap 1 + Counter
    expect(lapTime).toHaveLength(2);

    // Lap 2 + Lap 1 + Counter
    fireEvent.press(getByTestId("lap-reset"));
    lapTime = queryAllByText(/(\d{2}:){2}\d{2}/);
    expect(lapTime).toHaveLength(3);
  });

  test("resets the stopwatch", () => {
    const { getByText, queryByTestId } = render(<Stopwatch />);

    // Start
    fireEvent.press(queryByTestId("start-stop"));
    // Lap 1
    fireEvent.press(queryByTestId("lap-reset"));
    // Stop
    fireEvent.press(queryByTestId("start-stop"));
    // Reset
    fireEvent.press(queryByTestId("lap-reset"));

    expect(getByText("00:00:00")).toBeTruthy();
    expect(queryByTestId("lap-list")).toBeNull();
  });
});
