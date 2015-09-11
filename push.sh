git add .
git commit -m"submit"
git push origin  develop

soucePath='webapp/client/*'
showPath='../frontend.github.io'
cp -fr ${soucePath} ${showPath};
cd ${showPath};

git add .
git commit -m"submit"
git push origin  master







