import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { isEmpty } from 'lodash';

import Grid from './Grid';
import Card from './Card';
import Loading from '../Loading';

// Context.
import { AppContext } from '../../context';
import useCurrentLocation from '../../hooks/useCurrentLocation';

const Stats = () => {
  const [deviceLocation, setDeviceLocation] = useState({});
  const [statsData, setStatsData] = useState([]);
  const [dataAvailability, setDataAvailability] = useState(true);

  const { currentLocation } = useCurrentLocation();
  const { t } = React.useContext(AppContext);

  useEffect(() => {
    const getData = async () => {
      try {
        const location = await currentLocation();

        setDeviceLocation(location);
        if (!isEmpty(location) && location.state) {
          const state = location.state.toLowerCase();
          if (!state) return;
          const response = await fetch(
            `https://covidtracking.com/api/v1/states/${state}/current.json`
          );
          const data = await response.json();
          const {
            positive,
            death,
            hospitalizedCurrently,
            recovered,
            inIcuCurrently,
            onVentilatorCurrently,
          } = data;
          const stats = [
            {
              label: t('STATS_LABEL_POSITIVE'),
              stat: positive || 0,
              cardColor: '#9c27b0',
              icon: 'users',
            },
            {
              label: t('STATS_LABEL_DEATH'),
              stat: death || 0,
              cardColor: '#000000',
              icon: 'user',
            },
            {
              label: t('STATS_LABEL_HOSPITALIZED'),
              stat: hospitalizedCurrently || 0,
              cardColor: '#2196f3',
              icon: 'hospital',
            },
            {
              label: t('STATS_LABEL_RECOVERED'),
              stat: recovered || 0,
              cardColor: '#4caf50',
              icon: 'heartbeat',
            },
            {
              label: t('STATS_LABEL_ICU'),
              stat: inIcuCurrently || 0,
              cardColor: '#f44336',
              icon: 'bed',
            },
            {
              label: t('STATS_LABEL_VENTILATOR'),
              stat: onVentilatorCurrently || 0,
              cardColor: '#fdd835',
              icon: 'gas-cylinder',
            },
          ];

          setStatsData(stats);
        }
      } catch (error) {
        console.log(error);
        dataAvailability(false);
      }
    };

    getData();
  }, []);

  return (
    <View style={styles.container}>
      {dataAvailability === true ? (
        statsData.length === 0 ? (
          <Loading />
        ) : (
          <View style={styles.gridWrapper}>
            <Grid
              header={
                !isEmpty(deviceLocation) && (
                  <Text
                    style={styles.locationText}
                  >{`${deviceLocation.city}, ${deviceLocation.state}`}</Text>
                )
              }
              itemDimension={150}
              items={statsData}
              numofLoadingItems={6}
              spacing={10}
              isLoading={statsData.length < 1 ? true : false}
              renderItem={({ item }) => {
                return (
                  <Card
                    title={item.label}
                    stat={item.stat}
                    icon={item.icon}
                    cardColor={item.cardColor}
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
  locationText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    paddingVertical: 10,
  },
});
