import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { isEmpty } from 'lodash';
import { auth, firestore } from '../../api/firebase';

import { AppContext } from '../../context';

const Sex = ({ navigation }) => {
  const { setUserProfile, t, state } = React.useContext(AppContext);
  const registerUser = async (gender) => {
    if (!isEmpty(state.user)) {
      try {
        const pw = firestore().collection('users').doc().id;
        const un = `${pw}@ecrt-diaspora.com`;

        // Sign-up user
        await auth().createUserWithEmailAndPassword(un, pw);

        // Sign-in user.
        const userCredential = await auth().signInWithEmailAndPassword(un, pw);

        // Write collected data to firebase.
        firestore()
          .doc(`users/${userCredential.user.uid}`)
          .set({ ...state.user, gender }, { merge: true });
      } catch (error) {
        console.log('error');
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.titleStyle}>{t('TITLE_USER_GENDER')}</Text>
      </View>

      <View style={styles.buttonWrapper}>
        <Button
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.buttonText}
          title={t('ACTION_BUTTON_MALE')}
          onPress={() => {
            setUserProfile({ gender: 'male' });
            registerUser('male');
          }}
        />
        <Button
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.buttonText}
          title={t('ACTION_BUTTON_FEMALE')}
          onPress={() => {
            setUserProfile({ gender: 'female' });
            registerUser('female');
          }}
        />
      </View>
    </View>
  );
};

export default Sex;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginHorizontal: 16,
  },
  titleStyle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  buttonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  buttonStyle: { borderRadius: 19, padding: 20, margin: 10, width: 300 },
  buttonText: { fontSize: 20 },
});
