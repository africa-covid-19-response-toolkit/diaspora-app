import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Jobs from '../components/Jobs';

const JobsScreen = () => {
  return (
    <View style={styles.container}>
      <Jobs />
    </View>
  );
};

export default JobsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
});
