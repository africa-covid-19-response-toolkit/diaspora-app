import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const SignUpScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Sign up screen</Text>
      <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
        <Text>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
