import React, { useState, useEffect } from 'react';

import { firestore } from '../../api/firebase';
import Questions from './Questions';

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

  return <Questions questions={questions} />;
};

export default SelfCheck;
