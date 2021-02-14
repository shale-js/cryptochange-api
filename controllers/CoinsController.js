
const axios = require("axios")
const { Petro, Bolivar } = require("../models");

// instancias de los request
const { axiosExchangeRates, axiosCoingecko, axiosBlockchain } = require("../requests");

// Lista de monedas a consumir
const coins = [
    {
        symbol: 'btc',
        id: 'bitcoin'
    },
    {
        symbol: 'eth',
        id: 'ethereum'
    },
    {
        symbol: 'dash',
        id: 'dash'
    },
    {
        symbol: 'usd',
        id: 'dolar'
    },
    {
        symbol: 'bs',
        id: 'bolivar'
    },
    {
        symbol: 'ptr',
        id: 'petro'
    },
    {
        symbol: 'eur',
        id: 'euro'
    }
]

// Obtener todas las monedas en base al USD
async function getAllCoins(req, res) {
    try {
        // Consulta el ultimo registro ingresado del Petro y del Bolivar
        const petro = await Petro.findAll({ limit: 1, order: [['createdAt', 'DESC']], attributes: { exclude: ['id', 'createdAt', 'updatedAt'] } })
        const bolivar = await Bolivar.findAll({ limit: 1, order: [['createdAt', 'DESC']], attributes: { exclude: ['id', 'createdAt', 'updatedAt'] } })
        // Request del valor del Euro en USD
        const reqExchangeRates = axiosExchangeRates.get('/latest')

        // Request de la cryptomoneda dash para obtener el valor en USD
        const reqCoingecko = axiosCoingecko.get(`coins/dash?tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`)
        
        // Request de el BTC y ETH para obtener el valor en USD
        const reqBlockchain = axiosBlockchain.get(`/exchange/tickers`) 

        // Request Multiple
        const resp = await axios.all([ reqCoingecko, reqBlockchain, reqExchangeRates ]);

        res.json({
            btc: resp[1].data.find(ele => ele.symbol === 'BTC-USD').last_trade_price,
            eth: resp[1].data.find(ele => ele.symbol === 'ETH-USD').last_trade_price,
            dash: resp[0].data.market_data.current_price.usd,
            ptr: `${petro[0].value} USD`,
            bs: `${bolivar[0].value} = 1 USD`,
            eur: resp[2].data.rates.USD,
            usd: 1
        })
    } catch (e) {
        if (e.response && e.response.status === 400) {
            res.status(e.response.status).send(e.message);
        } else {
            res.status(500).send(e.message);
        }		
	}
}

async function getCurrencyCoin(req, res) {
    try {
        // verificar el parametro de currency_coin y el monto es valido
        if (['btc', 'eth', 'dash', 'eur', 'bs', 'ptr', 'usd'].includes(req.params.currency_coin) && parseFloat(req.params.amount)) {
            let resp, allRequest = {}, dataResponse = {}

            // Verificar el precio de btc, eth y dash de acuerdo a si el parametro es btc, eth, eur o usd
            if (['btc', 'eth', 'eur', 'usd'].includes(req.params.currency_coin)) {
                allRequest.reqCoingecko = { data } = await axiosCoingecko.get(`/coins/markets?vs_currency=${req.params.currency_coin}&ids=bitcoin%2Cethereum%2Cdash&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
            
            } else {
                
            }

            for (let i in coins) {
                if (coins[i].symbol === req.params.currency_coin) dataResponse[coins[i].symbol] = req.params.amount;
                if (['btc', 'eth', 'dash'].includes(coins[i].symbol)) {
                    if (['usd', 'eur'].includes(req.params.currency_coin)) {
                        dataResponse[coins[i].symbol] = parseFloat(req.params.amount) / parseFloat(data.find(ele => ele.symbol === coins[i].symbol).current_price);
                    }
                }

            }


            /* data = {
                btc: parseFloat(req.params.amount) * resp[0].data.find(ele => ele.symbol === 'btc').current_price,
                eth: parseFloat(req.params.amount) * resp[0].data.find(ele => ele.symbol === 'eth').current_price,
                dash: parseFloat(req.params.amount) * resp[0].data.find(ele => ele.symbol === 'dash').current_price,
                ptr: parseFloat(req.params.amount) * 60,
                bs: `${parseFloat(req.params.amount) * 100000} = ${req.params.amount} ${req.params.currency_coin.toUpperCase()}`,
                eur: parseFloat(req.params.amount) * parseFloat(resp[0].data.market_data.current_price.eur),
                usd: ''
            } */
            res.json(dataResponse)
        } else {
            throw { message: "El parametro ingresado no es valido"};
        }        
    } catch (e) {
        console.log(e);
        if (e.response && e.response.status === 400) {
            res.status(e.response.status).send(e.message);
        } else {
            res.status(500).send(e.message);
        }		
	}
}

module.exports = { getAllCoins, getCurrencyCoin };
