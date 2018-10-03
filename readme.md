# appli de demo

## 1. strapi

from: https://github.com/strapi/strapi-docker

Start a database

```sh
docker run -e MONGO_INITDB_DATABASE=strapi \
           -v `pwd`/db/:/data/db \
           --name strapi-mongo \
           -d mongo
```

Start strapi

```sh
docker run -e APP_NAME=strapi-app \
           -e DATABASE_CLIENT=mongo \
           -e DATABASE_HOST=strapi-mongo \
           -e DATABASE_PORT=27017 \
           -e DATABASE_NAME=strapi \
           -v `pwd`/strapi-app:/usr/src/api/strapi-app \
           --link strapi-mongo:mongo \
           -p 1337:1337 \
           --name strapi -d strapi/strapi
```

https://strapi.io/documentation/

## 2. client app

```sh
docker run \
    -it \
    --rm \
    --name demo-app \
    --net=host \
    -v /home/rvion/dev/app-web:/app \
    --workdir /app \
    node \
    bash
```

```sh
npm install
./node_modules/.bin/parcel ./public/index.html
```

javascript
node
npm: node package manager

```sh
alias drun2='docker run -it --rm -u $(id -u):$(id -g) -v $(pwd):/app -w /app --net=host'
alias start='drun2 node ./node_modules/.bin/parcel ./public/index.html'
```
