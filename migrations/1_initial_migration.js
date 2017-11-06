const Migrations = artifacts.require('./Migrations.sol');

if (!process.env.MULTISIG_WALLET_ADDRESS) {
  throw 'Multisig wallet address not found. Did you forgot to set "MULTISIG_WALLET_ADDRESS" environment variable?';
}

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
