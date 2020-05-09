import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Swiper from 'react-native-swiper';
import { firestore } from '../../api/firebase';
import { LocalizationContext } from '../../context/language';

const Message = ({ message }) => {
  const { locale } = React.useContext(LocalizationContext);

  return (
    <View style={[styles.slide, { backgroundColor: message.backgroundColor }]}>
      <Text style={styles.text}>{message.text[locale]}</Text>
    </View>
  );
};
const MessageList = ({ navigation }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('messages')
      .onSnapshot(handleOnSnapshot, handleError);
    return subscriber; // unsubscribe on unmount
  }, []);

  const handleOnSnapshot = (snapShot) => {
    if (!snapShot.empty) {
      let list = [];
      snapShot.forEach((doc) => {
        if (doc.exists) list = [...list, { id: doc.id, ...doc.data() }];
      });
      setMessages(list);
    }
  };

  const handleError = (error) => {
    console.log(error.message);
  };

  return (
    <Swiper style={styles.wrapper} horizontal={false} showsPagination={false}>
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </Swiper>
  );
};

export default MessageList;

const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
