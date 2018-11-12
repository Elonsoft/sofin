/*
 * Created by: alexo (Big Deeper Advisors, Inc)
 * For: Input Strategic Partners (ISP) and Intimate.io
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
 * TITLE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE COPYRIGHT HOLDERS OR ANYONE DISTRIBUTING THE
 * SOFTWARE BE LIABLE FOR ANY DAMAGES OR OTHER LIABILITY, WHETHER IN CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

pragma solidity ^0.4.18;

import "./AuthorizedList.sol";

contract Authorized is AuthorizedList {

    function Authorized() public {
        /// Set the initial permission for msg.sender (contract creator), it can then add permissions for others
        authorized[msg.sender][APHRODITE] = true;
    }

    /// Check if _address is authorized to access functionality with _authorization level
    modifier ifAuthorized(address _address, bytes32 _authorization) {
        require(authorized[_address][_authorization] || authorized[_address][APHRODITE]);
        _;
    }

    /// @dev Check if _address is authorized for _authorization
    function isAuthorized(address _address, bytes32 _authorization) public view returns (bool) {
        return authorized[_address][_authorization];
    }

    /// @dev Change authorization for _address 
    /// @param _address Address whose permission is to be changed
    /// @param _authorization Authority to be changed
    function toggleAuthorization(address _address, bytes32 _authorization) public ifAuthorized(msg.sender, APHRODITE) {

        /// Prevent inadvertent self locking out, cannot change own authority
        require(_address != msg.sender);

        /// No need for lower level authorization to linger
        if (_authorization == APHRODITE && !authorized[_address][APHRODITE]) {
            authorized[_address][CUPID] = false;
        }

        authorized[_address][_authorization] = !authorized[_address][_authorization];
    }
}
