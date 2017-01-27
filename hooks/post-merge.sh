#!/bin/sh
#
# To enable this hook, rename this file to "post-merge".

array__contains (){
    local branch
    for branch in "${@:2}"; do [[ "$branch" == "$1" ]] && return 0; done
    return 1
}

current_branch=`git rev-parse --abbrev-ref HEAD 2>/dev/null`
branches=("master" "staging" "qa" "development")

if [ 0 == "$(array__contains current_branch branches)" ]
then
    echo "No timestamp Update"
	git fetch --tags
else
    # update package.json && bower.json
	echo "PRE MERGE"
    bash ./bin/version.sh
	git update-index --add ./*.json
	git add .
fi

exit 0
