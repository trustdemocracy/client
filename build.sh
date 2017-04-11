docker build -f .docker/Dockerfile.build -t ng-cli .
docker run -it -v `pwd`:/app ng-cli
docker build -f .docker/Dockerfile -t trustdemocracy-client .
