#!/usr/bin/env bash

echo "VERSION"

output=`git describe --tags --always --long`
echo "$output"

timestamp=`date +%s%N | cut -b1-13`
# or `date +%s%3N` verify difference later
echo "$timestamp"

# Pull/Fetch Tags from remote
git fetch --tags

# Update package.json & bower.json with passing arguments
node ./bin/build_timestamp.js $output $timestamp

git add -A ./*.json

