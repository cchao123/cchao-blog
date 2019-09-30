---
title: '步骤'
---
```
 ▄████▄   ▄████▄   ██░ ██  ▄▄▄       ▒█████
▒██▀ ▀█  ▒██▀ ▀█  ▓██░ ██▒▒████▄    ▒██▒  ██▒
▒▓█    ▄ ▒▓█    ▄ ▒██▀▀██░▒██  ▀█▄  ▒██░  ██▒
▒▓▓▄ ▄██▒▒▓▓▄ ▄██▒░▓█ ░██ ░██▄▄▄▄██ ▒██   ██░
▒ ▓███▀ ░▒ ▓███▀ ░░▓█▒░██▓ ▓█   ▓██▒░ ████▓▒░
░ ░▒ ▒  ░░ ░▒ ▒  ░ ▒ ░░▒░▒ ▒▒   ▓▒█░░ ▒░▒░▒░
  ░  ▒     ░  ▒    ▒ ░▒░ ░  ▒   ▒▒ ░  ░ ▒ ▒░
░        ░         ░  ░░ ░  ░   ▒   ░ ░ ░ ▒
░ ░      ░ ░       ░  ░  ░      ░  ░    ░ ░
░        ░

```
[github地址](https://github.com/2020807070/vuepress-theme-cchao)

## 安装
```
$ npm i vuepress-theme-cchao -s
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
| |-- .vuepress
| |-- posts                 需要手动创建（必备）
| | |-- xx1.md
| | |-- xx2.md
| | |-- xx3.md
| | |-- ...
| |-- RADEME.md             配置首页（必备）
```

> `posts`下的`.md文章` 配置
```
---
title: 标题
coverMap: '封面图'
date: 2019/4/21
description: 文章描述
tags:       文章标签
  - JS
  - eventLoop
---
```



> `docs`下的`README.md` 配置
```
---
home: true
head: '头像'
hideInfo: false         是否隐藏个人信息 默认不传为false
footer: footer部分
---
```

## 运行