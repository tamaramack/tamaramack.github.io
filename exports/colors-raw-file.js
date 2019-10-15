/**
 * colors-raw-file.js js file created by Tamara G. Mack on 02-May-19 for tamaramack.github.io
 */
/**
 * raw-files js file created by Tamara G. Mack on 09-Apr-19 for tamaramack.github.io
 */
const fs = require('fs');
const path = require('path');
const util = require('util');

(async () => {
  const readFile = util.promisify(fs.readFile);

  const dataDir = path.resolve(__dirname, '../src/js/colors');
  const destinationDir = path.resolve(__dirname, '../src/css');
  const encoding = 'utf-8';

  await saveJsonFile();

  async function saveJsonFile() {
    const workFile = 'colors.json';
    const rawInput = await readFile(path.join(dataDir, workFile), encoding);
    const json = JSON.parse(rawInput);
    let content = '';

    for (const prop in json) {
      if (json.hasOwnProperty(prop) && prop
        !== 'transparent') { content += `$${prop}: ${json[prop]};\n`; }
    }

    fs.writeFileSync(path.join(destinationDir, 'colors.scss'), content);
  }
})();
