#!/usr/bin/env bash

echo "VERSION"
commitMessage=`bash ./bin/tagpackage.sh`

echo "POST VERSION"
echo "COMMIT VERSION TIMESTAMP"

git commit -m "$commitMessage" ./*.json
git add .

git push origin HEAD
git push --tags