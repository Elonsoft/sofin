module.exports = function(error) {
  assert.isAtLeast(error.message.search('invalid opcode'), -1, 'Invalid opcode error must be returned');
}
