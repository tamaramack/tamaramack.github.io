#!/usr/bin/env bash

current_branch=`git rev-parse --abbrev-ref HEAD 2>/dev/null`
branches=("master" "staging" "qa" "development")

array__contains (){
    local return_=1
    for branch in "${branches[@]}"; do [[ "$branch" == "$1" ]] && local return_=0; done
    echo "$return_"
}

staging_branch="staging"
qa_branch="qa"
dev_branch="development"

echo "Current branch: $current_branch : $(array__contains $current_branch)"

if [ 0 == "$(array__contains $current_branch)" ]
then
    git fetch origin $current_branch

    case "$current_branch" in
        "$staging_branch")
            echo "Merge from remote $qa_branch? <no>|<yes> [default: no]"
            read boolMerge

            if [ "$boolMerge" == "yes" ]
            then
                git fetch origin $qa_branch:$qa_branch
                git merge $qa_branch
            fi
        ;;

        "$qa_branch")
            echo "Merge from remote $dev_branch? <no>|<yes> [default: no]"
            read boolMerge

            if [ "$boolMerge" == "yes" ]
            then
                git fetch origin $dev_branch:$dev_branch
                git merge $dev_branch
            fi
        ;;
    esac
else
    echo "Launch npm link"
#npm install npm
#npm -f link
fi
