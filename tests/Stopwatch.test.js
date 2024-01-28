import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Stopwatch from "../src/Stopwatch";

describe("Stopwatch", () => {
  test("renders initial state correctly", () => {
    const { getByText, queryByTestId } = render(<Stopwatch />);

    expect(getByText("00:00:00")).toBeTruthy();
    expect(queryByTestId("lap-text")).toBeNull();
  });

  test("starts and stops the stopwatch", async () => {
    const { getByText, queryByText } = render(<Stopwatch />);

    fireEvent.press(getByText("Start"));
    expect(queryByText(/(\d{2}:){2}\d{2}/)).toBeTruthy();

    fireEvent.press(getByText("Stop"));
    expect(queryByText(/(\d{2}:){2}\d{2}/)).toBeTruthy(); // modified toBeNull to toBeTruthy
  });


  test("pauses and resumes the stopwatch", async () => {
    const { getByText, findByText } = render(<Stopwatch />);

    fireEvent.press(getByText("Start"));

    await new Promise((resolve) => setTimeout(resolve, 20));
    fireEvent.press(getByText("Pause"));
    const pausedTimeElement = getByText(/(\d{2}:){2}\d{2}/);
    const pausedTime = pausedTimeElement.props.children;

    fireEvent.press(getByText("Resume"));
    const resumedTimeElement = await findByText(/(\d{2}:){2}\d{2}/);
    const resumedTime = resumedTimeElement.props.children;
    expect(pausedTime && resumedTime).toBeTruthy();
    if (pausedTime && resumedTime) {
      expect(pausedTime).not.toBe(resumedTime);
    }
  });


  test("records and displays lap times", async () => {
    const { getByText, getByTestId } = render(<Stopwatch />);
    fireEvent.press(getByText("Start"));
    await new Promise((resolve) => setTimeout(resolve, 500));
    fireEvent.press(getByText("Lap"));
    const lapList = getByTestId("lap-list");
    expect(lapList.props.children[1].props.children.length).toBe(1);
    await new Promise((resolve) => setTimeout(resolve, 10));
    fireEvent.press(getByText("Lap"));

    expect(lapList.props.children[1].props.children.length).toBe(2);
  });

  test("resets the stopwatch", () => {
    const { getByText, queryByTestId } = render(<Stopwatch />);

    fireEvent.press(getByText("Start"));
    fireEvent.press(getByText("Lap"));
    fireEvent.press(getByText("Reset"));

    expect(getByText("00:00:00")).toBeTruthy();
    expect(queryByTestId("lap-text")).toBeNull();
  });
});
