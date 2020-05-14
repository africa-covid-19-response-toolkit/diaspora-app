import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MessageList from './MessageList';

const width = Dimensions.get('screen').width;

const Home = () => {
  return (
    <View style={styles.container}>
      <MessageList />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
