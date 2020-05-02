import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { auth } from '../api/firebase';

const SignInScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Welcome to diaspora app</Text>
      <View style={styles.buttonsWrapper}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text style={styles.buttonText}>Register and continue</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            try {
              auth().signInAnonymously();
            } catch (error) {
              console.log(error.message);
            }
          }}
        >
          <Text style={styles.buttonText}>Skip registration</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsWrapper: {
    flexDirection: 'row',
  },
  button: { margin: 50, padding: 50 },
  buttonText: { color: 'blue', fontSize: 20 },
});
