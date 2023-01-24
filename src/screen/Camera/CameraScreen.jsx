/** @format */

import React, { useState, useRef, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { Camera, requestCameraPermissionsAsync } from 'expo-camera';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { PermissionsAndroid, Platform } from 'react-native';

import { styles } from './styles';
export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [imageUri, setImageUri] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      console.log(Platform);
      if (Platform.OS === 'ios') {
        const { status } = await requestCameraPermissionsAsync();
        if (status !== 'granted') {
          alert('Camera permission is required!');
        }
        setHasPermission(status === 'granted');
      } else if (Platform.OS === 'android') {
        const cameraPermission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'This app needs access to your camera',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        const storagePermission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'This app needs access to your storage',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (
          cameraPermission === PermissionsAndroid.RESULTS.GRANTED &&
          storagePermission === PermissionsAndroid.RESULTS.GRANTED
        ) {
          setHasPermission(true);
        } else {
          alert('Camera and storage permission is required!');
        }
      }
    })();
  }, []);

  const takePicture = async () => {
    try {
      if (cameraRef.current) {
        let photo = await cameraRef.current.takePictureAsync();
        setImageUri(photo.uri);
        if (Platform.OS === 'ios') {
          const saveResult = await CameraRoll.save(photo.uri);
          if (!saveResult) {
            alert('Failed to save image to camera roll!');
          } else if (saveResult instanceof Error) {
            alert(saveResult.message);
          }
        } else if (Platform.OS === 'android') {
          const saveResult = await CameraRoll.save(photo.uri);
          if (!saveResult) {
            alert('Failed to save image to camera roll!');
          } else if (saveResult instanceof Error) {
            alert(saveResult.message);
          }
        }
      }
    } catch (error) {
      console.log(error);
      alert('An error occurred while taking the picture');
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
    return <Text>No access to camera roll</Text>;
  }

  return (
    <View style={styles.container}>
      {imageUri === null ? (
        <Camera
          style={styles.cameraView}
          type={type}
          ref={cameraRef}
        >
          <View style={styles.captureContainer}>
            <TouchableOpacity onPress={takePicture}>
              <Text style={styles.captureButtonText}></Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              onPress={toggleCameraType}
              style={styles.flipCamera}
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
      ) : (
        <View>
          <Image
            style={{ width: 450, height: 750 }}
            source={{
              uri: imageUri,
            }}
          />
        </View>
      )}
    </View>
  );
}
