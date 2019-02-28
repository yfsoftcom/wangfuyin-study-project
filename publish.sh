# bin/bash
npm run build
mv build foo
scp -r ./foo root@a.yunplus.io:/home/yf/nodejs/projects/demo.yunplus.io/
scp -r ./foo/static root@a.yunplus.io:/home/yf/nodejs/projects/demo.yunplus.io/