# bin/bash
npm run build
mv build foo
scp -r ./foo root@a.yunplus.io:/home/yf/projects/docker/server-yunplus-io-docker-compose/nginx/www/
scp -r ./foo/static root@a.yunplus.io:/home/yf/projects/docker/server-yunplus-io-docker-compose/nginx/www/