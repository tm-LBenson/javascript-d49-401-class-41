/** @format */

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cameraView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  captureContainer: {
    flex: 0,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  capture: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'silver',
    alignSelf: 'center',
  },

  captureButtonText: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
    width: 75,
    height: 75,
    marginBottom: 40,
    borderRadius: 50,
    backgroundColor: 'silver',
    alignSelf: 'center',
  },
  roundButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'silver',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipCamera: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'silver',
    alignItems: 'center',
    justifyContent: 'center',
  },
  roundButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
