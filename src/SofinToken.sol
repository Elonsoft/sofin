pragma solidity 0.4.18;

import './zeppelin/token/BurnableToken.sol';


contract SofinToken is BurnableToken {
  string public constant name = 'SOFIN ICO';
  string public constant symbol = 'SOFIN';
  uint256 public constant decimals = 18;

  uint256 public constant tokenCreationCap =  45000000 * 10 ** decimals;

  address public multiSigWallet;
  address public owner;

  bool public active = true;

  uint256 public oneTokenInWei = 153846153846200;

  modifier onlyOwner {
    if (owner != msg.sender) {
      revert();
    }
    _;
  }

  modifier onlyActive {
    if (!active) {
      revert();
    }
    _;
  }

  /**
  * @dev add an address to the list of frozen accounts
  * @param account address to freeze
  * @return true if the address was added to the list of frozen accounts, false if the address was already in the list 
  */
  function freezeAccount(address account) public onlyOwner returns (bool success) {
    if (!frozenAccounts[account]) {
      frozenAccounts[account] = true;
      Frozen(account);
      success = true; 
    }
  }

  /**
  * @dev remove an address from the list of frozen accounts
  * @param account address to unfreeze
  * @return true if the address was removed from the list of frozen accounts, 
  * false if the address wasn't in the list in the first place 
  */
  function unfreezeAccount(address account) public onlyOwner returns (bool success) {
    if (frozenAccounts[account]) {
      frozenAccounts[account] = false;
      Unfrozen(account);
      success = true;
    }
  }

  event Mint(address indexed to, uint256 amount);
  event MintFinished();

  /**
   * event for token purchase logging
   * @param purchaser who paid for the tokens
   * @param beneficiary who got the tokens
   * @param value weis paid for purchase
   * @param amount amount of tokens purchased
   */
  event TokenPurchase(
    address indexed purchaser,
    address indexed beneficiary,
    uint256 value,
    uint256 amount
  );

  function SofinToken(address _multiSigWallet) public {
    multiSigWallet = _multiSigWallet;
    owner = msg.sender;
  }

  function() payable public {
    createTokens();
  }

  /**
   * @param  _to Target address.
   * @param  _amount Amount of SOFIN tokens, _NOT_ multiplied to decimals.
   */
  function mintTokens(address _to, uint256 _amount) external onlyOwner {
    uint256 decimalsMultipliedAmount = _amount.mul(10 ** decimals);
    uint256 checkedSupply = totalSupply.add(decimalsMultipliedAmount);
    if (tokenCreationCap < checkedSupply) {
      revert();
    }

    balances[_to] += decimalsMultipliedAmount;
    totalSupply = checkedSupply;

    Mint(_to, decimalsMultipliedAmount);
    Transfer(address(0), _to, decimalsMultipliedAmount);
  }

  function withdraw() external onlyOwner {
    multiSigWallet.transfer(this.balance);
  }

  function finalize() external onlyOwner {
    active = false;

    MintFinished();
  }

  /**
   * Sets price in wei per 1 SOFIN token.
   */
  function setTokenPriceInWei(uint256 _oneTokenInWei) external onlyOwner {
    oneTokenInWei = _oneTokenInWei;
  }

  function createTokens() internal onlyActive {
    if (msg.value <= 0) {
      revert();
    }

    uint256 multiplier = 10 ** decimals;
    uint256 tokens = msg.value.mul(multiplier) / oneTokenInWei;

    uint256 checkedSupply = totalSupply.add(tokens);
    if (tokenCreationCap < checkedSupply) {
      revert();
    }

    balances[msg.sender] += tokens;
    totalSupply = checkedSupply;

    Mint(msg.sender, tokens);
    Transfer(address(0), msg.sender, tokens);
    TokenPurchase(
      msg.sender,
      msg.sender,
      msg.value,
      tokens
    );
  }
}
