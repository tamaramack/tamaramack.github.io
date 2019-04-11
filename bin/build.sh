#!/usr/bin/env bash

npm run lint
npm run build:raw

[[ "$1" ]] && mode=$1 || mode="production"
echo "Build Mode: $1 || $mode"

if [[ "$mode" == "development" ]];
    then
        rimraf dev-build
        vue-cli-service build --mode development
    else
        rimraf dist
        vue-cli-service build
fi
