#!/usr/bin/env bash
# https://www.atlassian.com/git/tutorials/git-hooks/
# http://stackoverflow.com/questions/16709404/how-to-automate-the-commit-and-push-process-git

versionType=$1
echo "Version type called: $versionType"

git add .

echo "Enter the $versionType message: [default: 'Version $versionType to <newTag>']"
read versionMessage

if [ -z "$versionMessage" ]; then
    versionMessage="Version $versionType to v%s"
fi

echo 'Commit version tag to git? <no>|<yes> [default: <yes>]'
read processType

if [ "$processType" == "no" ];
    then
        npm version --no-git-tag-version $versionType -m "$versionMessage"
    else
        npm version $versionType -m "$versionMessage"
fi

