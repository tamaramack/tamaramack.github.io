#!/bin/sh

current_branch=`git rev-parse --abbrev-ref HEAD 2>/dev/null`
branches=("master" "staging" "qa" "development")

array__contains (){
    local return_=1
    for branch in "${branches[@]}"; do [[ "$branch" == "$1" ]] && local return_=0; done
    echo "$return_"
}

staging_branch="staging"
dev_branch="development"
master_branch="master"

if [[ 0 == "$(array__contains $current_branch)" ]]
then
    # check for staging
    if [[ "$current_branch" == "$staging_branch" ]]
    then
        # Inquiry if version update is necessary
        echo "Bump git tag version? <no>|<yes> [default: no]"
        read boolBump

        if [ "$boolBump" == "yes" ]
        then
            echo "Version Type? [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease | from-git]"
            read versionType

            bash ./bin/bump.sh $versionType
        fi
    fi
else
    # update package.json && bower.json
    # bash ./bin/version.sh
    echo "PRE PUSH :: NO PROCESS"
fi

exit 0
