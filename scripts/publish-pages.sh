#!/bin/bash
set -euv
cd ../demo/dist/
git init
git remote add pb git@github.com:boenfu/vuex-along.git || true
git add .
git commit -m "publish gh-pages"
git push pb master:gh-pages -f
