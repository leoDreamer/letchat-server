docker-compose stop
docker rmi $(docker images app:$2) -f
docker-compose up -d