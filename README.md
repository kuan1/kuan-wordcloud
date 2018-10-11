# kuan-wordcloud

简单包装一下：
[https://github.com/ecomfe/echarts-wordcloud](https://github.com/ecomfe/echarts-wordcloud)

预览地址：
[http://luzhongkuan.cn/web/wordcloud](http://luzhongkuan.cn/web/wordcloud)

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

## 更新日志

- v1.0.4: 更改大小显示范围
- v1.0.3: 1.0.2 版本忘了 build（-，-）
- v1.0.2: return echarts 实例对象
- v1.0.1: 加入 echarts resize
