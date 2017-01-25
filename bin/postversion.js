#! /usr/bin/env node

(function () {
    var sh = require("shelljs"),
        fs = require('fs');
    var packageFilePath = './package.json',
        git_desc_exec = 'git describe --tags --always --long',
        no_git = process.env.npm_config_no_git || false,
        no_push = process.env.npm_config_no_push || no_git || false,
        date = new Date();

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

    console.log('\nENV TIMESTAMP\t', process.env.npm_config_no_timestamp);
    console.log('\nARGV TIMESTAMP\n', process.argv);
    if (process.env.npm_config_no_timestamp) {
        console.log("\nGIT VERSION SHELL\tPOST VERSION NOT REQUIRED.");
        return false;
    }

    var data = fs.readFileSync(packageFilePath, "utf8");
    sh.exec("echo shell.exec works " + process.env.npm_package_config_timestamp);
    data = JSON.parse(data);

    //Get git tag that was previously committed during the version process
    var output = sh.exec(git_desc_exec, {silent: true}).output;
    output = output.trim();
    console.log("\nGIT BUILD NUMBER", output);

    //Assign full git tag to 'build' parameter
    data.config.build = output;
    //Assign new timestamp to 'timestamp' parameter
    data.config.timestamp = date.getTime();

    //save updated package.json file
    data = JSON.stringify(data, undefined, 2);
    if (typeof data === 'string' && data.length > 10) {
        fs.writeFileSync(packageFilePath, data);
    }
    // Do the same for the bower.json file
    updateBowerJsonFunc((output.split('-')[0]).slice(1));

    //if no git restriction ( --no_git ) parameter
    if (!no_git) {
        console.log('\nCOMMIT VERSION TIMESTAMP');
        sh.exec(['git commit -m "Update timestamp: ' + date.getTime() + ' & build: \ ' +
        '' + output + '" ./*.json'].join('&&'));

        //if no push restriction ( --no_push ) parameter
        if (!no_push) {
            console.log('\nPUSH VERSION TIMESTAMP');
            sh.exec(["git push origin HEAD", "git push origin HEAD --tags"].join('&&'));
        }
    }
    console.log('\n');
})();
