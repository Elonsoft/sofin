pragma solidity 0.4.18;

import '../../contracts/SofinToken.sol';


contract SofinTokenMock is SofinToken {
  function SofinTokenMock(address initialAccount, uint256 initialBalance, address _multiSigWallet)
    SofinToken(_multiSigWallet)
  {
    balances[initialAccount] = initialBalance;
    totalSupply = initialBalance;
  }
}
