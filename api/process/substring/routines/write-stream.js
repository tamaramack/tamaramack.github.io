/**
 * write-stream js file created by Tamara G. Mack on 19-Aug-19 for
 * tamaramack.github.io
 */
const fs = require('fs');
const util = require('util');

const open = util.promisify(fs.open);

/**
 *
 * @param iterator
 * @param filename
 * @param sendData
 * @returns {Promise<void>}
 */
module.exports = async function writeStream(iterator, filename, sendData) {
  await open(filename, 'w');
  const file = fs.createWriteStream(filename);

  for (let sub of iterator) file.write(`${ sub }\n`);
  file.end('\n');

  if (typeof sendData === 'function') {
    sendData(file);
  } else {
    process.send(sendData);
  }
};
