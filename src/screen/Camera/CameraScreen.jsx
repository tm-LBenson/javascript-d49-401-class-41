/** @format */

import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Button,
} from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';

export default function App() {
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();
  let [type, setType] = useState(Camera.Constants.Type.back);
  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === 'granted');
      setHasMediaLibraryPermission(mediaLibraryPermission.status === 'granted');
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    return (
      <Text>
        Permission for camera not granted. Please change this in settings.
      </Text>
    );
  }
  let flipCamera = () => {
    if (type === Camera.Constants.Type.back) {
      setType(Camera.Constants.Type.front);
    } else {
      setType(Camera.Constants.Type.back);
    }
  };
  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  if (photo) {
    let sharePic = () => {
      shareAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };

    let savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };

    return (
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.preview}
          source={{ uri: 'data:image/jpg;base64,' + photo.base64 }}
        />
        <View style={styles.buttons}>
          <Button
            style={styles.safeButton}
            title="Share"
            onPress={sharePic}
          />
          {hasMediaLibraryPermission ? (
            <Button
              style={styles.safeButton}
              title="Save"
              onPress={savePhoto}
            />
          ) : undefined}
          <Button
            style={styles.safeButton}
            title="Discard"
            onPress={() => setPhoto(undefined)}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <Camera
      type={type}
      style={styles.container}
      ref={cameraRef}
    >
      <View style={styles.buttonContainer}>
        
        <TouchableOpacity
          style={styles.roundButton}
          title="Take Pic"
          onPress={takePic}
        ></TouchableOpacity>
        <TouchableOpacity
          style={styles.flipCamera}
          onPress={flipCamera}
        >
          <Image
            style={{ width: 28, height: 28 }}
            source={{
              uri: 'https://cdn2.iconfinder.com/data/icons/social-productivity-line-art-1/128/camera-switch-512.png',
            }}
          />
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </Camera>
  );
}

const styles = StyleSheet.create({
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
