#!/usr/bin/env bash

output=`git describe --tags --always --long`

timestamp=`date +%s%N | cut -b1-13`
# or `date +%s%3N` verify difference later

# Pull/Fetch Tags from remote
git fetch --tags

# Update package.json & bower.json with passing arguments
node ./bin/build_timestamp.js $output $timestamp

git add -A ./*.json

echo "Update timestamp: $timestamp & build: $output"