require('dotenv').config();

require('babel-register');
require('babel-polyfill');
const Web3 = require('web3');

var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "inch metal target silly brother action mass brown steel convince detect void"; // 12 word mnemonic
var provider = new HDWalletProvider(mnemonic, "http://localhost:8888");

// setup chai
// const BigNumber = Web3.BigNumber

// const should = require('chai')
//   .use(require('chai-as-promised'))
//   .use(require('chai-bignumber')(BigNumber))
//   .should();

module.exports = {
  mocha: {
    useColors: true
  },
  networks: {
    development: {
      host: 'localhost',
      port: 7545,
      network_id: '*',
      // gas: 3500000
    },
    ropsten: {
      host: '127.0.0.1',
      port: 8888,
      network_id: '*',
      gas: 8000000,
      gasPrice: 100000000000,
      provider: provider
    },
    live: {
      host: 'localhost',
      port: 8545,
      network_id: 1,
      gas: 3000000,
      gasPrice: 396574240,
      from: '0x41F3Eb216832592953E7435d36d0821239bB19cD'
    }
  }
};
