'use strict';

const assertJump = require('./helpers/assertJump'),
  expectThrow = require('./helpers/expectThrow'),
  SofinTokenMock = artifacts.require('./helpers/SofinTokenMock.sol'),
  BigNumber = web3.BigNumber;

const { assertRevert } = require('./globals');

/*
  What to test?
  - Каждую функцию протестить
  - Code Coverage 100%
  - Respect Hard cap for both cases
  - Require to dissallow 0 price
  - Require to dissallow <= 40 price
  - Test price changing
  - Finalize check
  - onlyOwner
  - withdraw
*/

contract('SofinToken', function(accounts) {
  const MULTI_SIG_WALLET_ADDRESS = accounts[5],
   INITIAL_BALANCE = new BigNumber(100);
  const owner = accounts[0];

  let token;

  describe('basic', async function() {
    beforeEach(async function () {
      token = await SofinTokenMock.new(owner, INITIAL_BALANCE, MULTI_SIG_WALLET_ADDRESS);
    });

    it('has a valid multisig wallet', async function() {
      const walletAddress = await token.multiSigWallet();
      assert.equal(walletAddress, MULTI_SIG_WALLET_ADDRESS);
    });

    it('should return the correct totalSupply after construction', async function() {
      let totalSupply = await token.totalSupply();

      assert.equal(totalSupply.toNumber(), INITIAL_BALANCE);
    });
  });

  describe('minting', async function() {
    beforeEach(async function () {
      token = await SofinTokenMock.new(owner, 0, MULTI_SIG_WALLET_ADDRESS);
    });

    it('should mint a given amount of tokens to a given address', async function() {
      // given
      const expectedTotalSupply = 6499;

      // when
      await token.sendTransaction({ from: accounts[1], value: 1 });

      // then
      // validate receiver balance
      const balance1 = await token.balanceOf(accounts[1]);
      assert.equal(balance1.toNumber(), expectedTotalSupply);

      // validate totalSupply
      const totalSupply = await token.totalSupply();
      assert.equal(totalSupply.toNumber(), expectedTotalSupply);

      // validate sender balance
      const senderBalance = await token.balanceOf(owner);
      assert.equal(senderBalance.toNumber(), 0);
    });
  });

  describe('create tokens', async function() {
    beforeEach(async function () {
      token = await SofinTokenMock.new(owner, INITIAL_BALANCE, MULTI_SIG_WALLET_ADDRESS);
    });

    it('should transfer 1 SOFIN token successfully', async function() {
      // given
      const expectedTotalSupply = 100,
        expectedSofinTransferredAmount = new BigNumber(1);

      // when
      await token.transfer(accounts[1], expectedSofinTransferredAmount);

      // then
      // validate receiver balance
      const balance1 = await token.balanceOf(accounts[1]);
      assert.equal(balance1.toNumber(), expectedSofinTransferredAmount.toNumber());

      // validate totalSupply
      const totalSupply = await token.totalSupply();
      assert.equal(totalSupply.toNumber(), expectedTotalSupply);

      // validate sender balance
      const senderBalance = await token.balanceOf(owner);
      assert.equal(senderBalance.toNumber(), 99);
    });

    it('should transfer 5 SOFIN tokens successfully', async function() {
      // given
      const expectedTotalSupply = 100,
        expectedSofinTransferredAmount = new BigNumber(5);

      // when
      await token.transfer(accounts[1], expectedSofinTransferredAmount);

      // then
      // validate receiver balance
      const balance1 = await token.balanceOf(accounts[1]);
      assert.equal(balance1.toNumber(), expectedSofinTransferredAmount.toNumber());

      // validate totalSupply
      const totalSupply = await token.totalSupply();
      assert.equal(totalSupply.toNumber(), expectedTotalSupply);

      // validate sender balance
      const senderBalance = await token.balanceOf(owner);
      assert.equal(senderBalance.toNumber(), 95);
    });

    it('should throw when sender does not have enough tokens', async function() {
      // given
      const tokensToTransfer = 1000;

      // when
      try {
        await token.transfer(accounts[1], tokensToTransfer);
        assert.fail('should have thrown before');
      } catch (e) {
        assertJump(e);
      }
    });

    it('should respect the hardcap on creating 1 SOFIN token', async function() {
      // given
      const hardcap = 10700000;

      // when
      // mint the maximum allowed tokens
      await token.mintTokens(accounts[1], hardcap);
      const totalSupply = await token.totalSupply();
      assert(totalSupply.toNumber(), hardcap);

      // then
      try {
        await token.mintTokens(accounts[1], 1);
        assert.fail('should have thrown before');
      } catch (e) {
        assertJump(e);
      }
    });

    it('should not transfer 1 SOFIN token if contract is not active', async function() {
      // given
      const tokensToTransfer = 1;
      let contractStatus;

      // when
      contractStatus = token.active();
      assert(contractStatus, true);
      await token.finalize();
      contractStatus = token.active();
      assert(contractStatus, false);

      try {
        await token.transfer(accounts[1], tokensToTransfer);
        assert.fail('should have thrown before');
      } catch (e) {
        assertJump(e);
      }
    });

    it('should not transfer 5 SOFIN tokens if contract is not active', async function() {
      // given
      const tokensToTransfer = 5;
      let contractStatus;

      // when
      contractStatus = token.active();
      assert(contractStatus, true);
      await token.finalize();
      contractStatus = token.active();
      assert(contractStatus, false);

      try {
        await token.transfer(accounts[1], tokensToTransfer);
        assert.fail('should have thrown before');
      } catch (e) {
        assertJump(e);
      }
    });

    it('should burn 5 SOFIN tokens', async function() {
      // given
      const tokensToBurn = 5,
        expectedTotalSupply = new BigNumber(95);

      // when
      await token.burn(tokensToBurn);
      const totalSupply = await token.totalSupply();

      // then
      assert(expectedTotalSupply, totalSupply);
    });
  });

  describe('freezable', () => {
    beforeEach(async function () {
      token = await SofinTokenMock.new(owner, 10000, MULTI_SIG_WALLET_ADDRESS);
    });

    it('cannot approve from a frozen account', async () => {
      await token.freezeAccount(accounts[1]);
      try {
          const tx = await token.approve(accounts[2], '42', { from: accounts[1] });
          assert.fail();
      } catch (error) {
          assertRevert(error);
      }
    });

    it('can approve before freezeAccount() but not transferFrom when msg.sender is frozen', async () => {
      const tx = await token.approve(accounts[1], '2000');
      assert.notEqual(tx, 0x0);
      const allowed = await token.allowance(owner, accounts[1]);
      assert.equal(allowed, 2000);
      await token.freezeAccount(owner);
      try {
          const tx1 = await token.transferFrom(owner, accounts[2], '1000', { from: accounts[1] });
          assert.notEqual(tx1, 0x0);
          assert.fail();
      } catch (error) {
          assertRevert(error);
      }
  });
  });
});
