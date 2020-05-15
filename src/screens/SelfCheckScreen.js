import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SelfCheck from '../components/SelfCheck';

const SelfCheckScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <SelfCheck />
    </View>
  );
};

export default SelfCheckScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
  },
});
