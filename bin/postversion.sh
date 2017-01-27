#!/usr/bin/env bash

echo "POST VERSION"

output=`git describe --tags --always --long`
echo "$output"

timestamp=`date +%s%N | cut -b1-13`
# or `date +%s%3N` verify difference later
echo "$timestamp"

array_contains (){
    for arg in "$@"; do [[ "$arg" == "$1" ]] && return 0; done
    return 1
}

# Pull/Fetch Tags from remote
git fetch --tags

# Update package.json & bower.json with passing arguments
node ./bin/build_timestamp.js $output $timestamp
git add -A ./*.json

echo "COMMIT VERSION TIMESTAMP"
git commit -m "Update timestamp: $timestamp & build: $output" ./*.json
git push origin HEAD
git push --tags