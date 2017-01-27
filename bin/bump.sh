#!/usr/bin/env bash
# https://www.atlassian.com/git/tutorials/git-hooks/
# http://stackoverflow.com/questions/16709404/how-to-automate-the-commit-and-push-process-git

versionType=$1
echo "Version type called: $versionType"

git add .

echo "Enter the $versionType message: [optional: 'Version $versionType to <newTag>']"
read versionMessage

if [ -v "$versionMessage" ]; then
    versionMessage="Version $versionType to %s"
fi

echo 'Commit version tag to git? <no>|<yes> [optional: <yes>]'
read processType

if [ "$processType" == "no" ];
    then
        git version --no-git-tag-version $versionType -m "$versionMessage"
    else
        git version $versionType -m "$versionMessage"
fi

