#!/bin/bash
set -eux
npm install
./node_modules/.bin/parcel ./public/index.html
