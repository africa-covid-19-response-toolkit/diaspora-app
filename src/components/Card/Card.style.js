import {StyleSheet, Dimensions} from 'react-native';
export default StyleSheet.create({
  cardWrapper: {
    flex: 1,
    borderRadius: 10,
    borderStyle: 'solid',
    elevation: 10,
    height: 160,
  },
  contentWrapper: {
    marginHorizontal: 10,
    paddingVertical: 10,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardIcon: {
    paddingVertical: 10,
    marginTop: 10,
    textAlign: 'center',
    alignSelf: 'center',
  },
  cardTitleText: {
    color: '#ffffff',
    height: 52,
    fontSize: 16,
    lineHeight: 17,
    textAlign: 'center',
  },
  cardStatText: {
    color: '#ffffff',
    paddingVertical: 10,
    fontSize: 35,
    fontWeight: 'bold',
    lineHeight: 25,
    textAlign: 'center'
  },
});
