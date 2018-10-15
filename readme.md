# appli de demo

## 1. DB (mongodb)

```sh
docker run -e MONGO_INITDB_DATABASE=strapi \
           -v `pwd`/db/:/data/db \
           --name karma-mongo \
           -d mongo
```

## 2. Strapi (backend api server)

from: https://github.com/strapi/strapi-docker

```sh
docker run -e APP_NAME=strapi-app \
           -e DATABASE_CLIENT=mongo \
           -e DATABASE_HOST=karma-mongo \
           -e DATABASE_PORT=27017 \
           -e DATABASE_NAME=strapi \
           -v `pwd`/strapi-app:/usr/src/api/strapi-app \
           --link karma-mongo:mongo \
           -p 1337:1337 \
           --name karma-strapi -d strapi/strapi
```

https://strapi.io/documentation/

## 3. client app (react / mobx / typescript)

```sh
docker build --tag karma-client .
docker run --name karma-client \
           -it \
           --rm \
           --net=host \
           -v $(pwd):/app \
           karma-client
```

---

usefull aliases

```sh
alias drun1='docker run -it --rm -v $(pwd):/app -w /app --net=host'
alias drun2='docker run -it --rm -u $(id -u):$(id -g) -v $(pwd):/app -w /app --net=host'
alias drun3='docker run -it --rm -u $(id -u):$(id -g) -v $(pwd):/app -w /app -p 1234:1234 -p 1235:1235 --name karma-client karma-client parcel serve --hmr-port 1235 ./src/index.html'
```
