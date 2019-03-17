#!/usr/bin/env bash

output=`git describe --tags --always --long`

timestamp=`date +%s%N | cut -b1-13`

commitMessage="Update timestamp: $timestamp & build: $output"

bash ./bin/tagpackage.sh "$output" "$timestamp"

echo "POST VERSION"
echo "COMMIT VERSION TIMESTAMP"

git commit -m "$commitMessage" ./*.json
git add .

git push origin HEAD
git push --tags
