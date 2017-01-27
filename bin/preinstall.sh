#!/usr/bin/env bash

# return 1 if local npm package is installed globally, else 0
# example
# echo "gruntacular : $(npm_pkg_g_installed gruntacular)"
function npm_pkg_g_installed {
  # set to 1 initially
  local return_=1
  # set to 0 if not found
  npm list --depth 1 -g $1 > /dev/null 2>&1 || { local return_=0; }
  # return value
  echo "$return_"
}

if [ 0 == "$(npm_pkg_g_installed foundation-cli)" ];
then
    echo "foundation-cli not globally installed"
    gem uninstall foundation
    npm install -g foundation-cli
fi

npm rebuild node-sass
npm cache clean
npm prune
