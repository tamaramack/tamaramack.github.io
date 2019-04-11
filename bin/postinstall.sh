#!/usr/bin/env bash

# ./node_modules/bower/bin/bower cache clean
npm run build:raw
vue-cli-service build
vue-cli-service build --mode development
