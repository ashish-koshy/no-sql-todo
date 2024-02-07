# Docker - Mongo Local
## Launch Docker desktop and pull the image
    docker pull mongo

## Run a Docker container from the built image
    docker run -d -p 27017:27017

#

# Docker - Azure Cosmos Local
## Launch Docker desktop and pull the image
    docker pull mcr.microsoft.com/cosmosdb/linux/azure-cosmos-emulator:latest

## Run a Docker container from the built image
    docker run --publish 8081:8081 --publish 10250-10255:10250-10255 --interactive --tty mcr.microsoft.com/cosmosdb/linux/azure-cosmos-emulator:latest