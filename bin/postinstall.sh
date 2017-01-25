#!/usr/bin/env bash

./node_modules/bower/bin/bower cache clean
./node_modules/bower/bin/bower install --save
./node_modules/grunt-cli/bin/grunt merge
