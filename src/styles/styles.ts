// global stylesheet
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  // CONTAINERS ---------------------------------
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 200,
  },
  displayContainer: {
    width: 300,
    height: 100,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
    width: '100%',
    paddingBottom: 30,
    borderBottomWidth: 4,
    borderBottomColor: 'white',
  },
  lapContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: 'gray',
  },
  lapList: {
    marginTop: 0,
    maxHeight: 300,
    width: '100%',
  },

  // TEXT ---------------------------------
  timerText: {
    fontSize: 90,
    color: '#fff',
    fontFamily: 'Roboto',
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 10,
  },
  buttonTextStart: {
    fontSize: 17,
    color: '#ff0000',
    opacity: 1,
  },
  buttonTextStop: {
    fontSize: 17,
    color: '#00E100',
    opacity: 1,
  },
  buttonTextPause: {
    fontSize: 17,
    color: 'yellow',
    opacity: 1,
  },
  buttonTextResume: {
    fontSize: 17,
    color: '#00E100',
    opacity: 1,
  },
  lapNumber: {
    color: '#fff',
    fontSize: 18,
    width: '50%',
    textAlign: 'left',
  },
  lapTime: {
    color: '#fff',
    fontSize: 18,
    width: '50%',
    textAlign: 'right',
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
  },
  fastestLap: {
    color: '#00E100',
  },
  slowestLap: {
    color: '#ff0000',
  },

  // BUTTONS ---------------------------------
  startButton: {
    backgroundColor: '#4CAF50',
    padding: 0,
    width: 75,
    height: 75,
    borderRadius: 37.5,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  stopButton: {
    backgroundColor: '#9A1A1A',
    padding: 15,
    width: 75,
    height: 75,
    borderRadius: 37.5,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.7
  },
  pauseButton: {
    backgroundColor: '#FFC107',
    padding: 0,
    width: 75,
    height: 75,
    borderRadius: 37.5,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.9
  },
  button: {
    width: 75,
    height: 75,
    borderRadius: 37.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lapButton: {
    borderColor: '#fff',
    borderWidth: 2,
    width: 75,
    height: 50,
    alignItems: 'center',
    paddingTop: 12,
    marginTop: 12,
  },
  resetButton: {
    backgroundColor: '#595959',
  },
  buttonDisabled: {
    opacity: 0.5,
    borderColor: '#fff',
    borderWidth: 2,
    width: 75,
    height: 50,
    alignItems: 'center',
    paddingTop: 12,
    marginTop: 12,
  },
});


