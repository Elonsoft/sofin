require('dotenv').config();
require('babel-register');
require('babel-polyfill');

var WalletProvider = require('truffle-wallet-provider');
const Wallet = require('ethereumjs-wallet');

var mainNetPrivateKey = new Buffer(require('fs').readFileSync('./mainnet/private').toString(), 'hex');
var mainNetWallet = Wallet.fromPrivateKey(mainNetPrivateKey);

const HDWalletProvider = require('truffle-hdwallet-provider');
const NonceTrackerSubprovider = require('web3-provider-engine/subproviders/nonce-tracker');

module.exports = {
  mocha: {
    useColors: true
  },
  networks: {
    development: {
      host: 'localhost',
      port: 7545,
      network_id: '*',
    },
    ropsten: {
      network_id: '3',
      gas: 2900000,
      provider: function() {
        return new HDWalletProvider(process.env.ROPSTEN_MNEMONIC, 'https://ropsten.infura.io/v3/' + process.env.INFURA_API_KEY);
      },
    },
    live: {
      gas: 5000000,
      gasPrice: 8000000000,
      network_id: '1',
      provider: function() {
        const wallet = new WalletProvider(mainNetWallet, 'https://mainnet.infura.io/v3/' + process.env.INFURA_API_KEY);
        // NOTE: workaround for avoiding the 'Nonce too low' error when deploying with Infura
        var nonceTracker = new NonceTrackerSubprovider();
        wallet.engine._providers.unshift(nonceTracker);
        nonceTracker.setEngine(wallet.engine);
        return wallet;
      }
    }
  }
}
