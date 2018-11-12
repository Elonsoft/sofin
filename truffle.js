require('dotenv').config();

require('babel-register');
require('babel-polyfill');
const Web3 = require('web3');

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
      port: 8545,
      network_id: '*',
      // gas: 3500000
    },
    ropsten: {
      host: 'localhost',
      port: 8545,
      network_id: '3',
      gas: 2900000
    },
    live: {
      host: 'localhost',
      port: 8545,
      network_id: 1,
      gas: 3000000,
      gasPrice: 396574240,
      from: '0x00bA5F4c653837b94Df5cE11C9FD66081b6e048E'
    }
  }
};
