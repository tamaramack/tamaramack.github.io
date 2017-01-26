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
    if [ "$remote_sha" = $z40 ]
    then
        # New branch, examine all commits
        range="$local_sha"
    else
        # Update to existing branch, examine new commits
        range="$remote_sha..$local_sha"
    fi

    # Check for WIP commit
    commit=`git rev-list -n 1 --grep '^WIP' "$range"`
    if [ -n "$commit" ]
    then
        echo >&2 "Found WIP commit in $local_ref, not pushing"
        exit 1
    fi
fi

exit 0

# An example hook script to verify what is about to be pushed.  Called by "git
# push" after it has checked the remote status, but before anything has been
# pushed.  If this script exits with a non-zero status nothing will be pushed.
#
# This hook is called with the following parameters:
#
# $1 -- Name of the remote to which the push is being done
# $2 -- URL to which the push is being done
#
# If pushing without using a named remote those arguments will be equal.
#
# Information about the commits which are being pushed is supplied as lines to
# the standard input in the form:
#
#   <local ref> <local sha1> <remote ref> <remote sha1>
#
# This sample shows how to prevent push of commits where the log message starts
# with "WIP" (work in progress).

remote="$1"
url="$2"

z40=0000000000000000000000000000000000000000

while read local_ref local_sha remote_ref remote_sha
do
	if [ "$local_sha" = $z40 ]
	then
		# Handle delete
		:
	else
		if [ "$remote_sha" = $z40 ]
		then
			# New branch, examine all commits
			range="$local_sha"
		else
			# Update to existing branch, examine new commits
			range="$remote_sha..$local_sha"
		fi

		# Check for WIP commit
		commit=`git rev-list -n 1 --grep '^WIP' "$range"`
		if [ -n "$commit" ]
		then
			echo >&2 "Found WIP commit in $local_ref, not pushing"
			exit 1
		fi
	fi
done

exit 0
