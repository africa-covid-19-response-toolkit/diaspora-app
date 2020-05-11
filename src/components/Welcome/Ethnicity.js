import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { auth, firestore } from '../../api/firebase';

const Ethnicity = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Ethnicity</Text>
      <Button
        title="Next"
        onPress={async () => {
          const pw = firestore().collection('users').doc().id;
          const un = `${pw}@ecrt.com`;

          try {
            await auth().createUserWithEmailAndPassword(un, pw);
            auth().signInWithEmailAndPassword(un, pw);

            // Write collected data to firebase.
          } catch (error) {
            console.log('error');
          }
        }}
      />
    </View>
  );
};

export default Ethnicity;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
