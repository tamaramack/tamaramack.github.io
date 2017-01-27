#! /usr/bin/env node

(function () {
    //console.log('\nPROCESS.ENV', process.env);
    console.log('\nPROCESS.ARGV', process.argv);

    var sh = require("shelljs"),
        fs = require('fs');
    var packageFilePath = './package.json',
        date = parseInt(process.argv[3]) || (new Date()).getTime();

    var updateBowerJsonFunc = function (newVersion) {
        var bowerFilePath = './bower.json';

        var data = fs.readFileSync(bowerFilePath, "utf8");
        data = JSON.parse(data);
        data.version = newVersion;

        data = JSON.stringify(data, undefined, 2);
        if (typeof data === 'string' && data.length > 10) {
            fs.writeFileSync(bowerFilePath, data);
        }
    };

    var data = fs.readFileSync(packageFilePath, "utf8");
    sh.exec("echo shell.exec works");
    data = JSON.parse(data);

    //Get git tag that was previously committed during the version process
    var output = process.argv[2] || sh.exec('git describe --tags --always --long', {silent: true}).output;
    output = output.trim();
    console.log("\nGIT BUILD NUMBER", output);

    if(data.config.build === output){
        console.log("\nBUILD UPDATE NOT REQUIRED;", data.config.build);
        return;
    }

    //Assign full git tag to 'build' parameter
    data.config.build = output;
    //Assign new timestamp to 'timestamp' parameter
    data.config.timestamp = date;

    //save updated package.json file
    data = JSON.stringify(data, undefined, 2);
    if (typeof data === 'string' && data.length > 10) {
        fs.writeFileSync(packageFilePath, data);
    }
    // Do the same for the bower.json file
    updateBowerJsonFunc((output.split('-')[0]).slice(1));

})();
