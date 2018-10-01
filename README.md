# kuan-wordcloud

> test echarts

简单包装一下：(echarts-wordcloud)[https://github.com/ecomfe/echarts-wordcloud]

预览地址：http://luzhongkuan.cn/web/wordcloud

## 开发

```
# 安装
yarn || npm install

# 开发
yarn dev || npm run dev

# 编译
yarn build || npm run build
```

## 使用

```
 yarn add kuan-wordcloud || npm install -S kuan-wrodcloud
```

```
import initCloud from 'kuan-wordcloud'

initCloud(document.getElementById('demo'), [{name: '测试', value: 200}])
```
