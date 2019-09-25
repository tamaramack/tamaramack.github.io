#!/usr/bin/env bash

npm run lint

[[ "$1" ]] && mode=$1 || mode="production"
echo "Build Mode: $1 || $mode"

if [[ "$mode" == "development" ]];
then
  vue-cli-service build --modern --mode development
elif [ "$mode" == "all" ];
then
  vue-cli-service build --modern --mode development
  vue-cli-service build --modern
else
  vue-cli-service build --modern
fi
