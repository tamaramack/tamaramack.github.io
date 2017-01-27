#!/usr/bin/env bash

output=`git describe --tags --always --long`
echo "$output"

timestamp=`date +%s%N | cut -b1-13`
# or `date +%s%3N` verify difference later
echo "$timestamp"

array_contains (){
    for arg in "$@"; do [[ "$arg" == "$1" ]] && return 0; done
    return 1
}

# Pull/Fetch Tags from remote
git fetch --tags

# Update package.json & bower.json with passing arguments
node ./bin/timestamp.js $output $timestamp
git add .

if [[ -n "$@" ]]; then
    echo "ARGUMENTS PASSED : $@"

    if [[ ! "$(array_contains "no-commit")" ]]; then
        echo "Commit"
        git commit -m "Update timestamp: $timestamp & build: $output" ./*.json

        if [ ! "$(array_contains "no-push")" ]; then
            echo "Push"
            git push origin HEAD
            git push --follow-tags
        fi
    fi
else
    echo "NO ARGUMENTS PASSED"
    git commit -m "Update timestamp: $timestamp & build: $output" ./*.json
    git push origin HEAD
    git push --follow-tags
fi