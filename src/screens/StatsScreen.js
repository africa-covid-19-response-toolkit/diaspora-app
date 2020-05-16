import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions} from 'react-native';
import Grid from '../components/Grid';
import Card from '../components/Card/Card';
import Loading from '../components/Loading';
import Transport from '../api/transport';

const StatsScreen = ({ navigation }) => {
  const [statsData, setStatsData] = useState([]);
  const [dataAvailability, setDataAvailability] = useState(true);
  useEffect(() => {
    Transport.getStat().then((res) => {
      let covidStat = res.data[res.data.length - 1]; // set only the latest covid stat info
      let stats = [
        {
        'label': 'በአጠቃላይ የተጠቁ',
        'stat': covidStat.Confirmed,
        'cardColor': '#9c27b0',
        'icon': 'users'
      },
      {
        'label': 'በቫይረሱ የሞቱ',
        'stat': covidStat.Deaths,
        'cardColor': '#000000',
        'icon': 'user'
      },
      {
        'label': 'በህክምና ላይ ያሉ',
        'stat': covidStat.Active,
        'cardColor': '#2196f3',
        'icon': 'hospital'
      },
      {
        'label': 'ከቫይረሱ ያገገሙ',
        'stat': covidStat.Recovered,
        'cardColor': '#4caf50',
        'icon': 'heartbeat'
      },
      {
        'label': 'በፅኑ ህክምና ያሉ',
        'stat': '0',
        'cardColor': '#f44336',
        'icon': 'bed'
      },
      {
        'label': 'ሀገራቸው የተመለሱ',
        'stat': '2',
        'cardColor': '#fdd835',
        'icon': 'swap'
      }
    ];
    setStatsData(stats);
    }).catch((e) => {
      console.log(e);
      setDataAvailability(false);
    })
  });
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
                renderItem={item => {
                  return (
                    <Card
                      title={item.item.label}
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

export default StatsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    margin: 10,
    justifyContent: 'center'
  },
  gridWrapper: {
    justifyContent: 'flex-start',
    marginVertical: 15,
  },
  statScreenWarningText: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
    height: Dimensions.get('window').height - 50,
  },
  
});
