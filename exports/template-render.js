/**
 * template-render js file created by Tamara G. Mack on 17-Jun-19 for
 * tamaramack.github.io
 * example link: https://gist.github.com/PurpleBooth/109311bb0361f32d87a2
 */
const fs = require('fs');
const path = require('path');
const util = require('util');

(async () => {
  const readFile = util.promisify(fs.readFile);
  const writeFile = util.promisify(fs.writeFile);

  const encoding = 'utf-8';
  const dataDir = path.resolve(__dirname, '../docs/tmpl');
  const destinationDir = path.resolve(__dirname, '../docs');
  const pkgFile = path.resolve(__dirname, '../package.json');

  const pkg = JSON.parse(fs.readFileSync(pkgFile, encoding));

  let datetime = new Date(pkg.config.timestamp);
  let interDtFormat = new Intl.DateTimeFormat(undefined, {
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  const tmpl = {
    def: {
      DATETIME: interDtFormat.format(datetime),
      VERSION: pkg.version,
      CURRENTTAG: pkg.config.build
    },
    README: {}
  };

  fs.readdir(dataDir, (err, files) => {
    if (err) return console.error('ERROR', err);
    let i = files.length;
    while (i--) saveMdFile(files[i]);
  });

  async function saveMdFile(workFile) {
    const fileArr = workFile.split('.');
    if (fileArr[fileArr.length - 1] !== 'md') return null;
    if (!fileArr.includes('template')) return null;
    let temp = fileArr.indexOf('template');
    const rawInput = await readFile(path.join(dataDir, workFile), encoding);
    let content = rawInput.toString();

    for (let prop in tmpl.def) content = content.replace(`___${prop}___`, tmpl.def[prop]);

    if (tmpl[fileArr[0]]) {
      const page = tmpl[fileArr[0]];
      for (let prop in page) content = content.replace(`___${prop}___`, page[prop]);
    }

    temp = fileArr.splice(temp, 1);
    writeFile(path.join(destinationDir, fileArr.join('.')), content);
  }
})();
