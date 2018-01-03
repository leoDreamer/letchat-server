docker-compose down
if $2
then
docker rmi $(docker images app:$2) -f
fi
docker-compose up -d