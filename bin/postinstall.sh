#!/usr/bin/env bash

# ./node_modules/bower/bin/bower cache clean
npm audit fix
npm run build:raw
npm run build all
