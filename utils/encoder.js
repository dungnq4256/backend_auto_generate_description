const { encode } = require("gpt-tokenizer/cjs/model/text-davinci-003");

const encoder = (token) => encode(token).length || 0;

module.exports = encoder;
