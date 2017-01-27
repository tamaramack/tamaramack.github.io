#!/bin/sh

array__contains (){
    local branch
    for branch in "${@:2}"; do [[ "$branch" == "$1" ]] && return 0; done
    return 1
}

current_branch=`git rev-parse --abbrev-ref HEAD 2>/dev/null`
branches=("master" "staging" "qa" "development")

staging_branch="staging"
qa_branch="qa"
dev_branch="development"

if [ 0 == "$(array__contains current_branch branches)" ]
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
  npm install npm
  npm link
fi

exit 0
