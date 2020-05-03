import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LocalizationContext } from '../../context/language';

import { firestore } from '../../api/firebase';

const SelfCheck = () => {
  const [questions, setQuestions] = useState({});

  useEffect(() => {
    const loadData = async () => {
      try {
        const querySnapshot = await firestore().collection('questions').get();

        if (!querySnapshot.empty) {
          const allQuestions = {};
          querySnapshot.forEach((doc) => {
            if (doc.exists) {
              allQuestions[doc.id] = { id: doc.id, ...doc.data() };
            }
          });

          setQuestions(allQuestions);
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadData();
  }, []);

  const { t, locale, setLocale } = React.useContext(LocalizationContext);

  const [selected, setSelected] = useState(false);

  return (
    <View>
      {Object.keys(questions).map((key) => (
        <Text style={styles.questions} key={key}>
          👉{questions[key].text[locale]}
        </Text>
      ))}
    </View>
  );
};

export default SelfCheck;

const styles = StyleSheet.create({ questions: { margin: 10, fontSize: 16 } });
