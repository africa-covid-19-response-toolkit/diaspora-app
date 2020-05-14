import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Swiper from 'react-native-web-swiper';
import { firestore } from '../../api/firebase';

import { AppContext } from '../../context';

const width = Dimensions.get('screen').width;

const Message = ({ message }) => {
  const { locale } = React.useContext(AppContext);

  return (
    <View
      key={message.id}
      style={[styles.slide, { backgroundColor: message.backgroundColor }]}
    >
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

  // console.log(messages);
  if (!messages.length) return null;

  return (
    <View style={{ flex: 1, width }}>
      <Swiper vertical controlsProps={{ prevPos: false, nextPos: false }}>
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
      </Swiper>
    </View>
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

// import React from 'react';
// import { Text, TouchableOpacity, View } from 'react-native';
// import Swiper from 'react-native-web-swiper';

// export default class HomeScreen extends React.Component {
//   render() {
//     return (
//       <View style={{ flex: 1 }}>
//         <View style={{ flex: 1 }}>
//           <Swiper vertical loop>
//             <View
//               key={'asda939k-9494sks-33'}
//               style={{
//                 flex: 1,
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 backgroundColor: 'rgba(20,20,200,0.3)',
//               }}
//             >
//               <Text>Slide 1</Text>
//             </View>
//             <View
//               key={'dddd-9494sks-33'}
//               style={{
//                 flex: 1,
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 backgroundColor: 'rgba(20,20,200,0.3)',
//               }}
//             >
//               <Text>Slide 2</Text>
//             </View>
//           </Swiper>
//         </View>
//       </View>
//     );
//   }
// }
