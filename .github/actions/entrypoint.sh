#!/bin/bash

set -e

REPO_FULLNAME=igr/c19json

echo "## Initializing git repo..."
git init
echo "### Adding git remote..."
git remote add origin https://x-access-token:$GITHUB_TOKEN@github.com/$REPO_FULLNAME.git
echo "### Getting branch"
BRANCH=master
echo "### git fetch $BRANCH ..."
git fetch origin $BRANCH
echo "### Branch: $BRANCH (ref: $GITHUB_REF )"
git checkout $BRANCH

echo "## Login into git..."
git config --global user.email "igor.spasic@gmail.com"
git config --global user.name "RepoUpdater"

echo "## Ignore workflow files (we may not touch them)"
git update-index --assume-unchanged .github/workflows/*

npm run start

echo "## Deleting node_modules..."
rm -rf node_modules/
echo "## Staging changes..."
git add .
echo "## Commiting files..."
git commit -m "Repo Updated" || true
echo "## Pushing to $BRANCH"
git push -u origin $BRANCH
