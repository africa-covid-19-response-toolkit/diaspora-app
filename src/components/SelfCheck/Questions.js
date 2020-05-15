import React, { useState } from 'react';
import { isEmpty, xor } from 'lodash';
import { View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from '@expo/vector-icons/FontAwesome5';
import Question from './Question';

const Questions = ({ questions = {} }) => {
  if (isEmpty(questions)) return null;

  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState('1');
  const [history, setHistory] = useState(['1']);

  const gotoPrevious = () => {
    const previous = history[history.indexOf(currentQuestion) - 1];
    if (previous) {
      setCurrentQuestion(previous);
      let newHistory = history;

      if (history.length) {
        newHistory = xor(history, [currentQuestion]);
      }

      setHistory(newHistory);
    }
  };

  const addToHistory = (next) => {
    setHistory([...history, next]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        {currentQuestion !== '1' && (
          <TouchableOpacity
            onPress={() => {
              gotoPrevious();
            }}
          >
            <Icon name="arrow-left" size={20} />
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <Question
          question={questions[currentQuestion]}
          onNext={(next, value) => {
            setAnswers({ ...answers, ...value });
            addToHistory(next);
            setCurrentQuestion(next);
          }}
        />
      </ScrollView>
    </View>
  );
};

export default Questions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
  },
  headerContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 20,
    height: 70,
  },
});
