# appli de demo

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
