# appli de demo

## 1. DB (mongodb)

```sh
docker run -e MONGO_INITDB_DATABASE=strapi \
           -v `pwd`/db/:/data/db \
           --name strapi-mongo \
           -d mongo
```

## 2. Strapi (backend api server)

from: https://github.com/strapi/strapi-docker

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

## 3. client app

```sh
docker build --tag demo .
docker run --name demo-app \
           -it \
           --rm \
           --net=host \
           -v $(pwd):/app \
           demo
```

---

usefull aliases

```sh
alias drun1='docker run -it --rm -v $(pwd):/app -w /app --net=host'
alias drun2='docker run -it --rm -u $(id -u):$(id -g) -v $(pwd):/app -w /app --net=host'
```
