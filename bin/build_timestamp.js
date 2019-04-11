#! /usr/bin/env node

(function () {
  // console.log('\nPROCESS.ENV', process.env);
  console.log('\nPROCESS.ARGV', process.argv);

  const fs = require('fs'),
    sh = require('shelljs');
  const packageFilePath = './package.json',
    date = parseInt(process.argv[3]) || (new Date()).getTime();

  let data = fs.readFileSync(packageFilePath, 'utf8');
  sh.exec('echo shell.exec works');
  data = JSON.parse(data);

  // Get git tag that was previously committed during the version process
  var argvOutput = process.argv.length > 2 && process.argv[2];
  sh.exec(`echo process.argv Output ${argvOutput}`);
  var output = argvOutput || sh.exec('git describe --tags --always --long', { silent: true }).output;
  output = (output && output.trim()) || data.config.build;
  console.log('\nGIT BUILD NUMBER', output);

  if (data.config.build === output) {
    console.log('\nBUILD UPDATE NOT REQUIRED;', data.config.build);
    return;
  }

  // Assign full git tag to 'build' parameter
  data.config.build = output;
  // Assign new timestamp to 'timestamp' parameter
  data.config.timestamp = date;

  // save updated package.json file
  data = JSON.stringify(data, undefined, 2);
  if (typeof data === 'string' && data.length > 10) fs.writeFileSync(packageFilePath, data);
}());
