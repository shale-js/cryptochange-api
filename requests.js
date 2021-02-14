const axios = require('axios');

const axiosExchangeRates = axios.create({
  baseURL: 'https://api.exchangeratesapi.io/',
  headers: {
    common: {
      'Accept': 'application/json'
    },
  },
  timeout: 15000,
})

const axiosCoingecko = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3',
  headers: {
    common: {
      'Accept': 'application/json'
    },
  },
  timeout: 15000,
})

const axiosBlockchain = axios.create({
  baseURL: 'https://api.blockchain.com/v3',
  headers: {
    common: {
      'Accept': 'application/json'
    },
  },
  timeout: 15000,
})

module.exports = { axiosExchangeRates, axiosCoingecko, axiosBlockchain };
