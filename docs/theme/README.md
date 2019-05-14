---
title: '步骤'
---

## 安装
```
$ tnpm i vuepress-theme-cchao -s
```

## 应用主题
config.js中新增theme字段

```javascript
module.exports = {
  theme: 'cchao',
  ...
}
```

## 增加对应文件

创建`posts`用于渲染文章列表
```
|-- docs
| |-- .vuepress             开发目录
| |-- posts                 需要手动创建
| | |-- xx1.md
| | |-- xx2.md
| | |-- xx3.md
| | |-- ...
```

## 运行