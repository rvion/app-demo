#!/bin/bash

docker run \
    -it \
    --rm \
    -u $(id -u):$(id -g) \
    -v $(pwd):/app \
    -w /app \
    karma-client \
    bash