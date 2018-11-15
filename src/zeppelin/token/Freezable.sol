/*
 * Created by Input Strategic Partners (ISP) and Intimate.io
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
 * TITLE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE COPYRIGHT HOLDERS OR ANYONE DISTRIBUTING THE
 * SOFTWARE BE LIABLE FOR ANY DAMAGES OR OTHER LIABILITY, WHETHER IN CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

pragma solidity 0.4.18;

/**
 * @title Freezable
 * @dev allows authorized accounts to add/remove other accounts to the list of fozen accounts.
 * Accounts in the list cannot transfer and approve and their balances and allowances cannot be retrieved.
 */
contract Freezable {

  event Frozen(address indexed _account);
  event Unfrozen(address indexed _account);

  mapping (address => bool) public frozenAccounts;

  /// Make sure access control is initialized
  function Freezable() public { }

  /**
  * @dev Throws if called by any account that's frozen.
  */
  modifier notFrozen {
    require(!frozenAccounts[msg.sender]);
    _;
  }

/**
* @dev check if an account is frozen
* @param account address to check
* @return true iff the address is in the list of frozen accounts and hasn't been unfrozen
*/
  function isFrozen(address account) public view returns (bool) {
    return frozenAccounts[account];
  }
}
