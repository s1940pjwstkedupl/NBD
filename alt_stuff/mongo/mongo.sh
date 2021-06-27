#!/bin/bash

#docker ps
docker run --rm -d -p 27017-27019:27017-27019 -v /home/jd:/external --name mongodb mongo
docker exec -it mongodb bash
#docker stop mongodb
