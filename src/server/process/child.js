const fs = require('fs');
const path = require('path');

process.on('message', (data) => {
  const {
    i,
    time,
    start,
    end,
    str: s
  } = data;
  let now = new Date(Date.now() - time);
  now = `${now.getMinutes()}:${now.getSeconds()}.${now.getMilliseconds()}`;
  console.log(`Message from parent start: ${i} => ${now}`);
  let all = [];
  let files = [];

  for (let j = start; j < end; j += 1) {
    const filename = path.resolve(__dirname, `./substring/big-${j}.txt`);
    const fb = fs.openSync(filename, 'w');
    const file = fs.createWriteStream(filename);
    const subs = countSubs(s, j + 1);
    all[all.length] = subs.length;
    file.write(subs.join(','));
    file.end('\n');
    files.push(filename);
  }

  // fileStream.end('\n');

  now = new Date(Date.now() - time);
  now = `${now.getMinutes()}:${now.getSeconds()}.${now.getMilliseconds()}`;

  console.log(`Message from parent: ${data.i} => (${start},${end})`, s.length);
  process.send({
    now,
    files,
    all
  });

  function countSubs(s, count) {
    let keys = [];
    let len = s.length - count;
    let i = -1;
    while (len > i++) keys[keys.length] = s.slice(i, i + count);
    keys = keys.sort();

    i = keys.length;
    while (i--) { if (i && keys[i] === keys[i - 1]) delete keys[i]; }
    keys = keys.filter(v => v);
    return keys;
  }
});
