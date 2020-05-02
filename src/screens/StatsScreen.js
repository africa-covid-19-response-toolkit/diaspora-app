import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const StatsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Stats Screen</Text>
      <TouchableOpacity
        title="Full Screen"
        onPress={() => navigation.navigate('FullScreen')}
      >
        <Text>Try Full Screen</Text>
      </TouchableOpacity>
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
