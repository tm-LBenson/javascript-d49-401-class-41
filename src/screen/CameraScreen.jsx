/** @format */

import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Camera, requestCameraPermissionsAsync } from 'expo-camera';

export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [imageUri, setImageUri] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  useEffect(() => {
    console.log(imageUri);
  }, [imageUri]);

  const takePicture = async () => {
    if (cameraRef.current) {
      let photo = await cameraRef.current.takePictureAsync();
      setImageUri(photo.uri);
    }
  };

  const toggleCameraType = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back,
    );
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.cameraView}
        type={type}
        ref={cameraRef}
      >
        <View style={styles.captureContainer}>
          <TouchableOpacity
            style={styles.captureButton}
            onPress={takePicture}
          >
            <Text style={styles.captureButtonText}></Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={toggleCameraType}
            style={styles.roundButton}
          >
            <Image
              style={{ width: 28, height: 28 }}
              source={{
                uri: 'https://cdn2.iconfinder.com/data/icons/social-productivity-line-art-1/128/camera-switch-512.png',
              }}
            />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
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
  roundButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
