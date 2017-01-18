#!/usr/bin/env bash
# https://www.atlassian.com/git/tutorials/git-hooks/

git add .

echo 'Enter the commit message:'
read commitMessage

git commit -m "$commitMessage"

echo 'Enter the name of the branch:'
read branch

git push origin $branch

read