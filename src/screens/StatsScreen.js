import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Stats from '../components/Stats';
const StatsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Stats />
    </View>
  );
};
export default StatsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});