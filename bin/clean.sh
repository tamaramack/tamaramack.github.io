unameOut=`uname -s`

case "$unameOut" in
    Linux*)     machine=Linux;;
    Darwin*)    machine=Mac;;
    CYGWIN*)    machine=Windows;;
    MINGW*)     machine=Windows;;
    *)          machine="UNKNOWN:${unameOut}"
esac
echo "${machine}"

if [ $machine == Mac ] || [ $machine == Linux ];
then

  if [ -n "$1" ] && [ -d node_modules ];
  then
    echo "Ultra Cleaning."
    rm .eslintcache
    rm package-lock.json
    rm -rf node_modules
  fi

  if [ -d dist ] && [ -d devdist ];
  then
    rm -r dist
    rm -r devdist
  fi
elif [ $machine == Windows ];
then

  if [ -n "$1" ] && [ -d node_modules ];
  then
    echo "Ultra Cleaning."
    rm .eslintcache
    rm package-lock.json
    rm -rf node_modules
  fi

  if [ -d dist ] && [ -d devdist ];
  then
    rm -r dist
    rm -r devdist
  fi
fi

