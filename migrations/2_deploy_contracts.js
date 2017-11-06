const SofinToken = artifacts.require('./SofinToken.sol'),
  walletNum = process.env.MULTISIG_WALLET_ADDRESS;

module.exports = function(deployer) {
  deployer.deploy(SofinToken, walletNum);
};
