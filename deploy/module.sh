docker rmi $(docker images module:base) -f
docker build -t module:base -f Dockerfile.module