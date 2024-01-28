import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  displayText: {
    fontSize: 65,
    fontFamily: 'Courier New' ,
    marginBottom: 25,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  btnStart: {
    alignItems: 'center',
    marginBottom: 15,
  },
  flatList: {
    flex: 1, 
    marginTop: 25
  },
  lapItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
  },
  column: {
    flex: 1,
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderColor: 'black',
    paddingVertical: 8,
    fontWeight: 'bold',
  }
});