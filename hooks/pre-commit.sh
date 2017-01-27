#!/bin/sh
#
# To enable this hook, rename this file to "pre-commit".

array__contains (){
    local branch
    for branch in "${@:2}"; do [[ "$branch" == "$1" ]] && return 0; done
    return 1
}

current_branch=`git rev-parse --abbrev-ref HEAD 2>/dev/null`
branches=("master" "staging" "qa" "development")

if [ ! "$(array__contains current_branch branches)" ]
then
    # update package.json && bower.json
    bash ./bin/postversion.sh no-commit
else
    echo "No timestamp Update"
	git fetch --tags
fi

exit 0
