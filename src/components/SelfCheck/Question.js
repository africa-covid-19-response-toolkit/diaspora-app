import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AppContext } from '../../context';
import jsonLogic from 'json-logic-js';

const QuestionButton = ({ text, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.action}>
    <Text style={styles.actionText}>{text}</Text>
  </TouchableOpacity>
);

const QuestionMultipleChoice = ({ choices = [], locale, onPress }) => {
  const [userSelection, setUserSelection] = useState([]);

  if (!choices.length) return null;

  const handleChoiceClick = (clicked) => {
    //onPress
  };

  return (
    <View style={styles.choiceWrapper}>
      {choices.map((choice, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleChoiceClick(choice.text[locale])}
          style={styles.choice}
        >
          <Text>{choice.text[locale]}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const Question = ({ question = {}, onNext }) => {
  const { locale } = React.useContext(AppContext);

  const [userSelection, setUserSelection] = useState([]);

  let actions = question.actions || {};

  actions = Object.keys(actions)
    .sort(function (a, b) {
      return actions[a].order - actions[b].order;
    })
    .map(function (category) {
      return actions[category];
    });

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.titleStyle}>{question.text[locale]}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <>
          {Object.keys(actions).map((key) => {
            return (
              <View key={key}>
                {/* Multiple choice */}

                <QuestionMultipleChoice
                  locale={locale}
                  choices={question['multiple_choice']}
                />

                {/* Buttons */}
                <QuestionButton
                  text={actions[key].text[locale]}
                  onPress={() => {
                    const value = actions[key].value || {};
                    let next = JSON.parse(question.next) || null;

                    // if next is object, that means it's a JSON logic rule.
                    if (typeof next === 'object') {
                      next = jsonLogic.apply(next, value);
                    }

                    if (next && onNext) {
                      onNext(next, { ...value, ...choices });
                    }
                  }}
                />
              </View>
            );
          })}
          {/* {question.type &&
            (question.type === 'close' || question.type === 'transfer') && (
              <QuestionButton
                text={t('ACTION_BUTTON_START_OVER')}
                onPress={() => onNext('1', {})}
              />
            )} */}
        </>
      </View>
    </View>
  );
};

export default Question;

const styles = StyleSheet.create({
  container: {},
  titleStyle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  action: {
    alignSelf: 'stretch',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#e8e8e8',
    borderRadius: 5,
  },
  choiceWrapper: {
    marginBottom: 20,
  },
  choice: {
    alignSelf: 'stretch',
    paddingVertical: 10,
  },
  actionText: { fontSize: 16 },
  questions: {
    margin: 10,
    fontSize: 25,
    color: 'white',
    flexWrap: 'wrap',
  },
});
