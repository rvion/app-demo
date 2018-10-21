#!/bin/bash
docker run -it --rm -u $(id -u):$(id -g) -v $(pwd):/app -w /app -p 1234:1234 -p 1235:1235 --name karma-client karma-client parcel serve --hmr-port 1235 ./src/index.html