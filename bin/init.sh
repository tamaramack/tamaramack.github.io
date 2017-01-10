#!/usr/bin/env bash

#set -e
#set -x
#
#for package in $(npm -g outdated --parseable --depth=0 | cut -d: -f2)
#do
#    npm -g install "$package"
#done

npm update -g
npm install -g foundation-cli
npm link
npm prune
