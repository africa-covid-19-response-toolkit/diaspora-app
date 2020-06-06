import React from 'react';
import { StyleSheet, View } from 'react-native';
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
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});
