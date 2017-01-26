#!/usr/bin/env bash

set -e
set -x

for package in $(npm outdated --parseable --depth=0 | cut -d: -f2)
do
    npm install "$package@latest" --save
done

npm update -g
npm install -g
npm link
npm prune
