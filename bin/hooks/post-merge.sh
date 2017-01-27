#!/usr/bin/env bash
#
# To enable this hook, rename this file to "post-merge".

current_branch=`git rev-parse --abbrev-ref HEAD 2>/dev/null`
branches=("master" "staging" "qa" "development")

array__contains (){
    local return_=1
    for branch in "${branches[@]}"; do [[ "$branch" == "$1" ]] && local return_=0; done
    echo "$return_"
}

if [ 0 == "$(array__contains $current_branch)" ]
then
    echo "No timestamp Update"
    git fetch --tags
else
    # update package.json && bower.json
    echo "PRE MERGE"
    bash ./bin/tagpackage.sh
    git update-index --add ./*.json
    git add .
fi
