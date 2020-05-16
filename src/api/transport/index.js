import axios from 'axios';

export default {
  getStat: () =>
    axios({
      url: 'https://api.covid19api.com/country/ethiopia',
      method: 'GET'
    })
};