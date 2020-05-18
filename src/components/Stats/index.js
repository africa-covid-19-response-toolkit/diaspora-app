import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { firestore } from '../../api/firebase';

import Grid from './Grid';
import Card from './Card';
import Loading from '../Loading';

// Context.
import { AppContext } from '../../context';

const Stats = () => {
  const [statsData, setStatsData] = useState([]);
  const [dataAvailability, setDataAvailability] = useState(true);

  const { locale } = React.useContext(AppContext);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('stats/app-stat-cards/data')
      .onSnapshot(handleOnSnapshot, handleError);

    // Stop listening for updates when no longer required
    return () => unsubscribe();
  }, []);

  const handleOnSnapshot = (snapshot) => {
    if (!snapshot.empty) {
      let list = [];
      snapshot.forEach((doc) => {
        if (doc.exists) list = [...list, { id: doc.id, ...doc.data() }];
      });

      setStatsData(list);
    }
  };

  const handleError = (error) => {
    console.log(error.message);
    setDataAvailability(false);
  };

  return (
    <View style={styles.container}>
      {dataAvailability === true ? (
        statsData.length === 0 ? (
          <Loading />
        ) : (
          <View style={styles.gridWrapper}>
            <Grid
              itemDimension={150}
              items={statsData}
              numofLoadingItems={6}
              spacing={10}
              isLoading={statsData.length < 1 ? true : false}
              renderItem={(item) => {
                return (
                  <Card
                    title={item.item.text[locale]}
                    stat={item.item.stat}
                    icon={item.item.icon}
                    cardColor={item.item.cardColor}
                  />
                );
              }}
            />
          </View>
        )
      ) : (
        <View style={styles.statScreenWarningText}>
          <Text>
            Ooops! We are unable to communiate with the server. Are you offline?
          </Text>
        </View>
      )}
    </View>
  );
};

export default Stats;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
  },
  gridWrapper: {
    justifyContent: 'flex-start',
  },
  statScreenWarningText: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
    height: Dimensions.get('window').height - 50,
  },
});
