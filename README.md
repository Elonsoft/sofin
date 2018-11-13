# About SOFIN project

SOFIN (***so**cial **fi**nancial **n**etwork*) – P2P-lending online service.

It is a marketplace platform which brings together creditors and borrowers:

* Creditor— private individuals, banks, microfinance organizations and funds;
* Borrowers — private individuals, individual entrepreneurs and organizations.

Loans are issued in the fiat currency of the country where the borrower resides. This allows the currency to be exchanged through the SOFIN token if the creditor and the borrower are from different countries.

What we have achieved so far:

* A fully developed financial model;
* A package of legal documents to issue loans is established;
* The design of the interface is elaborated;
* App domain logic is implemented on 45%.

Using ICO, the project will leverage the tools to produce the final release of the platform and extend the territories beyond Russia.

# About SOFIN token

The system uses the Ethereum ERC 20 platform. The SOFIN token performs many functions on the system. Encourage of participants in a transaction to increase the number and quality of transactions in the system. The more turnover of issued loans is in the system, the cost of the token will be more expensive, since the entire fee will be taken in SOFIN - they will be automatically bought out from the exchanges to repay the fee. The history of all transactions will be stored in blockchain. Up to 20% of the loan will be available to be given in the SOFIN tokens. SOFIN will also be an intermediary between the exchanging of one fiat currency to another. You can find our more information in our [whitepaper](#links).

# Installation

1. Install node.js (>= 8), npm (or yarn)
2. Install [`truffle`](http://truffleframework.com) globally: `yarn global add truffle`
3. Install packages: `yarn`

# Testing

To run tests you need to run `geth` in test mode: `./scripts/run-geth.sh`, then run `truffle test` ro tun tests

**NOTE:** Remember to restart `geth` occasionally to reset its state

# [Links](#links)

* [Web Site](https://sofin.io)
* [Whitepaper (EN)](https://https://sofin.io/docs/whitepaper/en)
* [Whitepaper (RU)](https://https://sofin.io/docs/whitepaper/ru)


SOLIUM:
// Linter to identify and fix style & security issues in Solidity

FLATTENER:
// FOR VERIFICATION ON ETHERSCAN

// NOTE: need test node for testing with truffle

Freeze of account:
https://github.com/intimatetoken/itm-solidity/blob/master/contracts/managed/Freezable.sol

Mass token sending:

# HOW TO DEPLOY
1. Get the machine with parity installed on (open JSON RPC (see parity settings))
2. Set multisig address in .env (output wallet for ethereum)
3. yarn build
4. yarn truffle deploy --live (need to setup correct port for node, gas limit (3 000 000 is enough) and price (see https://ethgasstation.info/)) until deploy passes. You can also run parity with onelock settings to not ask your wallet password and IP's for access
5. Add verification for etherscan - Run `yarn flatten` (it will concatenate everything in one file) and copy it to etherscan (you'll need to specify compiler version and multisig wallet address from .env)
6. After deploy you'll get it's address to search and copy

Для начала можно задеплоить в Робстен (https://ropsten.etherscan.io/), но надо сначала создать контракт
(только yarn truffle deploy --robsten)

https://www.myetherwallet.com/  - тут можно создать аккаунт в сети робстен и дергать методы смартконтракта (но для этого нужно быть залогиненным под аккаунтом под которым деплоил) (truffle.js/robsten/from)

See https://wiki.parity.io/Parity-Ethereum for parity settings

To run parity in ropsten chain:
parity --warp --chain=ropsten --port 40404 --ws-port 9657 --jsonrpc-port 9657

To run parity in real chain:
parity --warp
