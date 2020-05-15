import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { get, xor, isEmpty } from 'lodash';
import { AppContext } from '../../context';
import jsonLogic from 'json-logic-js';

const QuestionButton = ({ text, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.action}>
    <Text style={styles.actionText}>{text}</Text>
  </TouchableOpacity>
);

const QuestionMultipleChoice = ({ choices = [], valueKey }) => {
  if (!choices.length) return null;

  const {
    locale,
    state: { userResponse = {} },
    setUserResponse,
  } = React.useContext(AppContext);

  const handleChoiceClick = (checked) => {
    // Remove if it's already selected, or add otherwise.
    const newSelection = xor(userResponse[valueKey], [checked]);
    setUserResponse({ [valueKey]: newSelection });
  };

  return choices.map((choice, index) => {
    const title = choice.text[locale];
    const selection = get(userResponse, valueKey)
      ? get(userResponse, valueKey)
      : [];
    return (
      <CheckBox
        key={index}
        title={title}
        checked={selection.indexOf(title) !== -1}
        onPress={() => handleChoiceClick(title)}
      />
    );
  });
};

const Question = ({ question = {}, onNext }) => {
  const {
    t,
    locale,
    state: { userResponse },
    setUserResponse,
  } = React.useContext(AppContext);

  if (isEmpty(question))
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 20 }}>{t('ALERT_QUESTION_MISSING')}</Text>
      </View>
    );

  let actions = question.actions || {};

  actions = Object.keys(actions)
    .sort(function (a, b) {
      return actions[a].order - actions[b].order;
    })
    .map(function (category) {
      return actions[category];
    });

  const valueKey = question['value_key'] || 'unknown_key';

  const getNext = (nextObject, actionValue = {}) => {
    let next = JSON.parse(nextObject) || null;
    // if next is object, that means it's a JSON logic rule.
    if (typeof next === 'object') {
      try {
        next = jsonLogic.apply(next, {
          ...userResponse,
          ...actionValue,
        });
      } catch (error) {
        return null;
      }
    }
    return next;
  };

  console.log(userResponse);

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.titleStyle}>{question.text[locale]}</Text>
      </View>

      <View style={styles.actionContainer}>
        <>
          {Object.keys(actions).map((key) => {
            const choices = question['multiple_choice'] || [];
            return (
              <View key={key}>
                {/* Multiple choice */}
                <View style={styles.choiceContainer}>
                  <QuestionMultipleChoice
                    choices={choices}
                    valueKey={valueKey}
                  />
                </View>

                {/* Buttons */}
                <QuestionButton
                  text={actions[key].text[locale]}
                  onPress={() => {
                    if (choices.length) {
                      const selection = get(userResponse, valueKey)
                        ? get(userResponse, valueKey)
                        : [];

                      let next = getNext(question.next);

                      if (selection.length) {
                        onNext(next);
                      } else {
                        alert(t('ALERT_MISSING_CHOICE'));
                      }
                    } else {
                      const actionValue = actions[key].value || {};

                      let next = getNext(question.next, actionValue);

                      if (actionValue) {
                        setUserResponse(actionValue);
                        onNext(next);
                      }
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
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#e8e8e8',
    borderRadius: 5,
  },
  actionContainer: { marginBottom: 20 },
  choiceContainer: {
    marginBottom: 20,
  },
  actionText: { fontSize: 16 },
  questions: {
    margin: 10,
    fontSize: 25,
    color: 'white',
    flexWrap: 'wrap',
  },
});
