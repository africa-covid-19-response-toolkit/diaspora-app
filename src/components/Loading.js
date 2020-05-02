import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

const Loading = ({
  text = 'Loading...',
  size = 'large',
  color = '#0000ff',
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
      <Text>{text}</Text>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
