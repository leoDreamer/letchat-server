git checkout develop
git pull develop
git tag $1
docker build -t app-$1 .