/** @format */

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Welcome to the Camera App</Text>
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  button: {
    backgroundColor: '#4ba37b',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
});
