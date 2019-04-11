#!/usr/bin/env bash

npm run build:raw

[[ "$1" ]] && mode=$1 || mode="development"

if [[ "$mode" == "development" ]];
    then
        vue-cli-service build --mode development
    else
        vue-cli-service build
fi
