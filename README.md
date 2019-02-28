## For Study Project

## Content
- UI Framework
- TODO List

### UI Framework
- React
- Element [https://elemefe.github.io/element-react/index#/zh-CN/quick-start](https://elemefe.github.io/element-react/index#/zh-CN/quick-start)


### TODO List
- [X] Handle the input key of `backspace` to clean all input
- [ ] Export the record the each time.


### Code Publish Script


```bash
scp -r ./build root@a.yunplus.io:/home/yf/nodejs/projects/demo.yunplus.io/foo
scp -r ./build/static root@a.yunplus.io:/home/yf/nodejs/projects/demo.yunplus.io/
```

```bash
#! /bin/sh
cd /home/yf/nodejs/projects/demo.yunplus.io/wangfuyin-study-project
git pull
npm i
npm run build
./publish.sh
echo "OK"
```