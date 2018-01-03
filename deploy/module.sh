docker rmi $(docker images module:base) -f
docker build -f Dockerfile.module -t module:base