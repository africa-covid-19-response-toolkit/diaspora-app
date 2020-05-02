import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const SelfCheckScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Self Check</Text>
    </View>
  );
};

export default SelfCheckScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
