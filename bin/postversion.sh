#!/usr/bin/env bash

bash ./bin/tagpackage.sh

echo "POST VERSION"
echo "COMMIT VERSION TIMESTAMP"

git commit -m "Update timestamp: $timestamp & build: $output" ./*.json
git add .

git push origin HEAD
git push --tags