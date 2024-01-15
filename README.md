## Shopify Summer 2024 Intern Challenge

## Contents
1. [Usage](#usage)
2. [Local Installation](#local-installation)
3. [Run Test Cases](#run-test-cases)
4. [Additional Features](#additional-features)
5. [Reflection](#reflection)
6. [Resources](#resources)
7. [Next Steps](#next-steps)

## Usage
There are six simple actions that you can do to use the stopwatch app.
The actions are as described below:
| Action | Description |
|--------|-------------|
| Start | Click this button to start the stopwatch. You can only start it when the time is 00:00:00. |
| Stop | Click this button to stop the stopwatch and set the time back to 00:00:00. |
| Pause | Click this button when the stopwatch is running to pause the time. |
| Resume | Click this button when the stopwatch is paused to continue the timer running from when you paused it. |
| Reset | Click this button at any time after the stopwatch has started to reset the time to 00:00:00 and remove all lap entries. |
| Lap | Click this button when the stopwatch is running to lap the time. You can see the lapped time in the lap entries below. You can only lap when the stopwatch is active. |

All of these actions have been implemented as methods in (`src/StopWatch.tsx`). The start and stop buttons use the same method. The resume and pause buttons share a method too. The reset and lap buttons have their own respective methods.

## Local Installation

### Prerequisites:
- Require one of the following emulators:
-- An android emulator with Android 6.0 (API 23) or newer. Works best with Android 13.0 (API 33)
-- An iOS (iPhone) emulator with iOS 13.4 or newer.
-- A smartphone running either of the above mentioned OS with the Expo Go app installed on it.
- NodeJS.
- JDK if you are using the Android emulator.
- clone by the repo by running (`git clone https://github.com/kishorpandya2210/eng-intern-assessment-react-native.git`).

### Generate Dev Build
1. run `cd eng-intern-assessment-react-native` to enter the project directory.
2. run `npm i` or `npm install` to download all the dependencies required by the project.
3. run `npm start` to run the project using Expo Go.
4. press `a` to run it on your Android emulator or `i` to run it on the iOS emulator. You can also scan the QR code to run it on your own device (make sure your device and laptop are connected to the same local network).

## Run Test Cases
With the same prerequisites for local installation as described [above](#local-installation):
1. run `npm test` in the root directory of the project.

Validated results from test cases:

![TestPassImage](https://github.com/kishorpandya2210/eng-intern-assessment-react-native/assets/77642092/5d3d1681-9f32-4554-b2e4-77990d2e144a)


## Additional features:
1. 

## Reflection
### Biggest Challenges
1. This was my first time working with react native specifically. This created a learning curve that I had to overcome, but my experience with other frameworks like react and flutter made this learning curve easier.
2. I chose the HH:MM:SS format instead of the MM:SS:MS format because to use milliseconds accurately, we have to use the system time instead of the setInterval function (like in my current application). I chose my implementation because after some research online, I discovered that the system time can change if a user travels from one timezone to another or if the daylight savings time switch happens. A change in the system time can cause the stopwatch to display inaccurate time. Using the setInterval function came with its own disadvantages too as if you set an interval of less than 100 ms, the accuracy of the stopwatch is lost. Making this choice was difficult.
3. It was confusing to understand how the app should be implementated since the instructions sometimes contradicted what was in the test cases. My implementation is my version of how I thought the app should be implemented after looking at the instructions and the test cases.

### Key Takeaways
1. React Native - This project forced me to learn react native. I noticed a lot of similarities between React and React Native. I also realised that Flutter has a different mechanism of doing this under the hood compared to React Native.
2. Testing - This project forced me to learn a lot of new Jest testing functions that I had never used before. Especially the Jest fake timer.
3. Hosting - I always believed to host an app I would have to publish it to either the Play Store or the App Store, working with Expo Go showed me that there are other ways to host apps too.

## Resources
Here are some resources that may be helpful during your work on this project:

- [React Native Doc](https://reactnative.dev/docs/environment-setup) - Official documentation to setup the development environment.

- [TypeScript Documentation](https://www.typescriptlang.org/docs/) - Official documentation for TypeScript, offering guidance on TypeScript features and usage.

- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) - Explore React Testing Library, a popular testing library for React applications.

## Next Steps
1. Build a pipeline to create a workflow where an approved PR can be merged into the deployment branch, triggering the hosted app to rebuild.
2. Add more tests to the test suite to ensure robustness of the application.
