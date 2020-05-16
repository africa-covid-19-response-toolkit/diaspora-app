import React from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/Entypo';
import styles from './Card.style';

// import {} from "react-native-gesture-handler";

const Card = props => {
  const {icon, title, stat, cardColor} = props;
  return  (
    <View
      style={[{borderRadius: 10, backgroundColor: cardColor, borderColor: cardColor,}, styles.cardWrapper]}>
      <View style={styles.contentWrapper}>
        <View style={styles.cardIcon}>
        {
          icon === "swap" ? 
          <Icon2 
            name={icon}
            size={45}
            color="#ffffff"
          /> :<Icon
            name={icon}
            size={45}
            color="#ffffff"
          />
        }
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
