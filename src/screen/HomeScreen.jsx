/** @format */

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { WhiteBalance } from 'expo-camera';

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={{ color: 'white' }}>Welcome to the Camera App</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Camera')}
      >
        <Text>Click to Begin</Text>
      </TouchableOpacity>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    color: '#fff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333',
  },
  button: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
});
