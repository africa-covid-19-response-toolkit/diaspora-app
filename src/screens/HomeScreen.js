import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { auth } from '../api/firebase';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Home Screen!</Text>

      <TouchableOpacity
        style={{ marginVertical: 50 }}
        onPress={() => auth().signOut()}
      >
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
