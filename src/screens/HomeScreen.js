import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { auth } from '../api/firebase';
import Home from '../components/Home';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Home />
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
