git checkout develop
git pull develop
git tag $1
git push --tags
rm .env
echo "tag=$1" >> .env
docker build -t app:$1 .