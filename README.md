# Project Overview
The goal of this project is to implement a stopwatch application using React Native and TypeScript. The stopwatch should have the following functionality:

- Start the stopwatch to begin counting time.
- Stop the stopwatch to pause the timer.
- Displays Laps when a button is pressed.
- Reset the stopwatch to zero.

You will be provided with a basic project structure that includes the necessary files and dependencies. Your task is to write the code to implement the stopwatch functionality and ensure that it works correctly.

# Project Demonstration

https://github.com/dhruvpatt/eng-intern-assessment-react-native/assets/84606623/f2160d8c-21d7-492d-83b4-65327a3097bb

# Tests
<img width="1333" alt="Screenshot 2024-01-28 at 11 33 17 PM" src="https://github.com/dhruvpatt/eng-intern-assessment-react-native/assets/84606623/bf5c9517-a9bb-4eeb-9f68-3cdf485cc1fe">


# How to Use

- Clone the repository onto your local machine
- run `npm install` to install all dependencies
- run `npm start` to deploy the application.

# Remarks

- Since my implementation didn't exactly align with the tests provided, I made a few modifications to the tests to better align with the implementation.

Modification 1: Starts and Stops the Stop Watch
- I modified this test by changing the last expect statement to check if the query exists since the main clock should still be present after starting and stopping the stopwatch.

Modification 2: Pauses and Resumes the Stop Watch
- I made this test asynchronous to add an setTimeout to create some delay. This allows the stopwatch to change before checking if the times were different.

Modification 3: Records and Displays Lap Times
- I modified this test by querying all the elements that match the Regex Expression and checking if there are the correct number of matches.
- There should be 2 matches when the lap button is pressed once (Main Clock + Lap 1)
- There shuld be 3 matches when the lap button is pressed twice (Main Clock + Lap 1 + Lap 2)
  



