#!/bin/sh

array__contains (){
    local branch
    for branch in "${@:2}"; do [[ "$branch" == "$1" ]] && return 0; done
    return 1
}

current_branch=`git rev-parse --abbrev-ref HEAD 2>/dev/null`
branches=("master" "staging" "qa" "development")

staging_branch="staging"
dev_branch="development"
master_branch="master"

if [ 0 == "$(array__contains current_branch branches)" ]
then
    # check for staging
    if [ "$current_branch" == "$staging_branch" ]
    then
     :
    fi
else
  :
fi

exit 0
