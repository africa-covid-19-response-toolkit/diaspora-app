import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { isEmpty } from 'lodash';

import Question from './Question';

const Questions = ({ questions = {} }) => {
  if (isEmpty(questions)) return null;

  const [answers, setAnswers] = useState({});
  const [nextQuestion, setNextQuestion] = useState(1);

  console.log(answers);

  return (
    <View>
      <Question
        question={questions[nextQuestion]}
        onNext={(next, value) => {
          setAnswers({ ...answers, ...value });
          setNextQuestion(next);
        }}
      />
    </View>
  );
};

export default Questions;
const styles = StyleSheet.create({ questions: { margin: 10, fontSize: 16 } });
