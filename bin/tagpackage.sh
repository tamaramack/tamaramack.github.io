#!/usr/bin/env bash

echo "VERSION"

[[ "$1" ]] && output=$1 || output=`git describe --tags --always --long`
echo "Tag output: $output"

[[ "$2" ]] && timestamp=$2 || timestamp=`date +%s%N | cut -b1-13`
# or `date +%s%3N` verify difference later
echo "Timestamp output: $timestamp"

# Pull/Fetch Tags from remote
git fetch --tags

# Update package.json with passing arguments
node ./bin/build_timestamp.js $output $timestamp

git add -A ./package.json
