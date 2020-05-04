import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { LocalizationContext } from '../../context/language';

const QuestionButton = ({ text, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text>{text}</Text>
  </TouchableOpacity>
);

const Question = ({ question = {}, onNext }) => {
  const { locale, t } = React.useContext(LocalizationContext);
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
      <Text style={styles.questions}>{question.text[locale]}</Text>

      <View style={styles.buttonContainer}>
        {Object.keys(actions).map((key) => (
          <QuestionButton
            key={key}
            text={t(actions[key].label)}
            onPress={() => {
              const value = actions[key].value || {};
              const next = actions[key].next || null;
              if (next && onNext) {
                onNext(next, value);
              }
            }}
          />
        ))}
      </View>
    </View>
  );
};

export default Question;

const styles = StyleSheet.create({
  container: { marginHorizontal: 16 },
  buttonContainer: { alignItems: 'center', justifyContent: 'center' },
  button: { margin: 10 },
  questions: { margin: 10, fontSize: 16 },
});
