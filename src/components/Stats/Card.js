import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';

import {
  MaterialCommunityIcons,
  FontAwesome5,
  Entypo,
} from '@expo/vector-icons';
import styles from './Card.style';

const Card = (props) => {
  const { icon, title, stat, cardColor } = props;
  return (
    <View
      style={[
        {
          borderRadius: 10,
          backgroundColor: cardColor,
          borderColor: cardColor,
        },
        styles.cardWrapper,
      ]}
    >
      <View style={styles.contentWrapper}>
        <View style={styles.cardIcon}>
          {icon === 'gas-cylinder' ? (
            <MaterialCommunityIcons name={icon} size={45} color="#ffffff" />
          ) : (
            <FontAwesome5 name={icon} size={45} color="#ffffff" />
          )}
        </View>
        <Text style={styles.cardStatText}>{stat}</Text>
        <Text style={styles.cardTitleText}>{title}</Text>
      </View>
    </View>
  );
};

Card.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  stat: PropTypes.number,
  cardColor: PropTypes.string,
};

Card.defaultProps = {};

export default Card;
