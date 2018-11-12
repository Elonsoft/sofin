// /*
//  * Created by Input Strategic Partners (ISP) and Intimate.io
//  *
//  * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
//  * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
//  * TITLE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE COPYRIGHT HOLDERS OR ANYONE DISTRIBUTING THE
//  * SOFTWARE BE LIABLE FOR ANY DAMAGES OR OTHER LIABILITY, WHETHER IN CONTRACT, TORT OR OTHERWISE,
//  * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
//  */

// 'use strict';

// const Aphrodite = artifacts.require('../contracts/Intimate.io/token/Aphrodite.sol');

// const { BULKTRANSFER, increaseTime, assertRevert, log } = require('../globals');

// contract('Aphrodite', accounts => {

//     const aphrodite = accounts[0];
//     const cupid = accounts[1];
//     const human = accounts[2];
//     const centaur = accounts[3];
//     const human2 = accounts[4];

//     describe('freezable', () => {
//         it('cannot approve from a frozen account', async () => {
//             const token = await Aphrodite.new();
//             await token.freezeAccount(human);
//             try {
//                 const tx = await token.approve(cupid, '42', { from: human });
//                 assert.fail();
//             } catch (error) {
//                 assertRevert(error);
//             }
//         });

//         it('can approve before freezeAccount() but not transferFrom when msg.sender is frozen', async () => {
//             const token = await Aphrodite.new();
//             const tx = await token.approve(human, '2000');
//             assert.notEqual(tx, 0x0);
//             const allowed = await token.allowance(aphrodite, human);
//             log("Allowance Aphrodite has given to Human = " + allowed.toNumber());
//             assert.equal(allowed, 2000);
//             await token.freezeAccount(human);
//             try {
//                 const tx1 = await token.transferFrom(aphrodite, cupid, '1000', { from: human });
//                 assert.notEqual(tx1, 0x0);
//                 assert.fail();
//             } catch (error) {
//                 assertRevert(error);
//             }
//         });

//         it('cannot transferFrom when the source account is frozen', async () => {
//             const token = await Aphrodite.new();
//             await token.transfer(human2, 3000);
//             await token.approve(human, '2000', { from: human2 });
//             await token.freezeAccount(human2);
//             try {
//                 const tx1 = await token.transferFrom(human2, cupid, '1000', { from: human });
//                 assert.notEqual(tx1, 0x0);
//                 assert.fail();
//             } catch (error) {
//                 assertRevert(error);
//             }
//         });

//         it('cannot transferFrom when the target account is frozen', async () => {
//             const token = await Aphrodite.new();
//             await token.approve(human, '2000');
//             await token.freezeAccount(cupid);
//             try {
//                 const tx1 = await token.transferFrom(aphrodite, cupid, '1000', { from: human });
//                 assert.notEqual(tx1, 0x0);
//                 assert.fail();
//             } catch (error) {
//                 assertRevert(error);
//             }
//         });

//         it('cannot transfer when frozen', async () => {
//             const token = await Aphrodite.new();
//             await token.transfer(human, 1000);
//             await token.freezeAccount(human);
//             try {
//                 const tx = await token.transfer(cupid, '42', { from: human });
//                 const bal = (await token.balanceOf(cupid)).toNumber();
//                 log("Cupid's balance = " + bal);
//                 assert.fail();
//             } catch (error) {
//                 assertRevert(error);
//             }
//         });

//         it('cannot bulk transfer when frozen', async () => {
//             const token = await Aphrodite.new();

//             await token.transfer(human, 1000);
//             await token.freezeAccount(human);

//             const addresses = [];
//             const amounts = [];
//             addresses.push(cupid);
//             amounts.push(10);
//             addresses.push(human2);
//             amounts.push(20);
//             addresses.push(centaur);
//             amounts.push(30);

//             try {
//                 await token.bulkTransfer(addresses, amounts, { from: human });
//                 assert.fail();
//             } catch (error) {
//                 assertRevert(error);
//                 assert.equal(await token.balanceOf(cupid), 0);
//                 assert.equal(await token.balanceOf(human2), 0);
//                 assert.equal(await token.balanceOf(centaur), 0);
//             } 
//         });

//         it('cannot retrieve balanceOf of a frozen account', async () => {
//             const token = await Aphrodite.new();
//             await token.freezeAccount(human);
//             try {
//                 await token.balanceOf(human);
//                 assert.fail();
//             } catch (error) {
//                 assertRevert(error);
//             }
//         });

//         it('cannot retrieve allowance with a frozen holder account', async () => {
//             const token = await Aphrodite.new();
//             await token.freezeAccount(human);
//             try {
//                 await token.allowance(human, centaur);
//                 assert.fail();
//             } catch (error) {
//                 assertRevert(error);
//             }
//         });

//         it('cannot retrieve allowance with a frozen spender account', async () => {
//             const token = await Aphrodite.new();
//             await token.freezeAccount(human);
//             try {
//                 await token.allowance(centaur, human);
//                 assert.fail();
//             } catch (error) {
//                 assertRevert(error);
//             }
//         });
//     });
// });
