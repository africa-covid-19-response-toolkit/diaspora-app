import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { AppContext } from '../../context';

const QuestionButton = ({ text, onPress }) => (
  <Button
    type="clear"
    titleStyle={{ fontSize: 20 }}
    title={text}
    containerStyle={{ marginVertical: 10 }}
    onPress={onPress}
  />
);

const Question = ({ question = {}, onNext }) => {
  const { locale, t } = React.useContext(AppContext);
  let actions = question.actions || {};

  actions = Object.keys(actions)
    .sort(function (a, b) {
      return actions[a].order - actions[b].order;
    })
    .map(function (category) {
      return actions[category];
    });

  return (
    <View>
      <Card containerStyle={styles.cardStyle}>
        <Text style={styles.questions}>{question.text[locale]}</Text>
      </Card>

      <View style={styles.buttonContainer}>
        <>
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
          {question.type &&
            (question.type === 'close' || question.type === 'transfer') && (
              <QuestionButton
                text={t('ACTION_BUTTON_START_OVER')}
                onPress={() => onNext('1', {})}
              />
            )}
        </>
      </View>
    </View>
  );
};

export default Question;

const styles = StyleSheet.create({
  cardStyle: {
    alignSelf: 'flex-start',
    borderRadius: 10,
    backgroundColor: '#007771',
    marginBottom: 30,
  },
  questions: { margin: 10, fontSize: 25, color: 'white' },
  buttonContainer: { alignItems: 'center', justifyContent: 'center' },
  button: { margin: 10 },
});
