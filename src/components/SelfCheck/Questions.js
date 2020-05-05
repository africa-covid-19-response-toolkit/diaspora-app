import React, { useState } from 'react';
import { isEmpty } from 'lodash';

import Question from './Question';

const Questions = ({ questions = {} }) => {
  if (isEmpty(questions)) return null;

  const [answers, setAnswers] = useState({});
  const [nextQuestion, setNextQuestion] = useState(1);

  return (
    <Question
      question={questions[nextQuestion]}
      onNext={(next, value) => {
        setAnswers({ ...answers, ...value });
        setNextQuestion(next);
      }}
    />
  );
};

export default Questions;
