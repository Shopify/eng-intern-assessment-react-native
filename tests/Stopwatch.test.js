import React from "react";
import {
  render,
  fireEvent,
  within,
  waitFor,
  act,
} from "@testing-library/react-native";
import Stopwatch from "../src/Stopwatch";

describe("Stopwatch", () => {
  test("renders initial state correctly", () => {
    const { getByText, queryByTestId } = render(<Stopwatch />);

    expect(getByText("00:00:00")).toBeTruthy();
    expect(queryByTestId("lap-list")).toBeNull();
  });

  test("starts and stops the stopwatch", () => {
    const { getByText, queryByText } = render(<Stopwatch />);

    fireEvent.press(getByText("Start"));
    expect(queryByText(/(\d{2}:){2}\d{2}/)).toBeTruthy();

    fireEvent.press(getByText("Pause"));
    expect(queryByText(/(\d{2}:){2}\d{2}/)).not.toBeNull();
  });

  test("pauses and resumes the stopwatch", () => {
    const { getByText } = render(<Stopwatch />);

    fireEvent.press(getByText("Start"));
    fireEvent.press(getByText("Pause"));
    const pausedTime = getByText(/(\d{2}:){2}\d{2}/);

    fireEvent.press(getByText("Start"));
    expect(getByText(/(\d{2}:){2}\d{2}/).textContent).not.toBe(pausedTime);
  });

  test("records and displays lap times", async () => {
    const { getByText, getByTestId } = render(<Stopwatch />);

    fireEvent.press(getByText("Start"));
    fireEvent.press(getByText("Lap"));
    expect(
      within(getByTestId("lap-list")).getByText(/(\d{2}:){2}\d{2}/)
    ).toBeTruthy();

    fireEvent.press(getByText("Lap"));
    console.log(getByTestId("lap-list").children)
    expect(getByTestId("lap-list").children.length).toBe(2);
  });

  test("resets the stopwatch", async () => {
    const { getByText, queryByTestId } = render(<Stopwatch />);
    fireEvent.press(getByText("Start"));
    fireEvent.press(getByText("Lap"));
    await new Promise(resolve => setTimeout(resolve, 1000));
    fireEvent.press(getByText("Reset"));
    await new Promise(resolve => setTimeout(resolve, 1000));
    expect(getByText("00:00:00")).toBeTruthy();
    expect(queryByTestId("lap-list")).toBeNull();
  });
});
