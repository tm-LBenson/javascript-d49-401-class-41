/** @format */
import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  buttons: {
    height: 20,
    flex: 0.1,
    flexDirection: 'row',
    gap: 10,
    padding: 20,
  },
  safeButton: {
    margin: 40,
  },
  roundButton: {
    width: 75,
    height: 75,
    borderRadius: 100,
    backgroundColor: 'silver',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: '#333',
    alignSelf: 'center',
    borderRadius: 100,
    justifyContent: 'flex-end',
    marginBottom: 100,
  },
  preview: {
    alignSelf: 'stretch',
    flex: 1,
  },
  flipCamera: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'silver',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
