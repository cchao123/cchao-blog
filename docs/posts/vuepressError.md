---
title: VuePress报错TypeError：res.getHeader is not a function
headimg: 'https://colorlib.com/activello/wp-content/uploads/sites/10/2015/11/oIpwxeeSPy1cnwYpqJ1w_Dufer-Collateral-test-1170x550.jpg'
# description: 我是一片文章我是一片文章我是一片文章我是一片文章我是一片文章的介绍
tags:
  - Vuepress
---



## 我是二级标题


### 首先初始化一个项目
> npm init -y

### 安装vuepress
> npm install -D vuepress

### 创建文件夹
> mkdir docs

### 在docs下面创建README.md
> echo '# Hello VuePress' > docs/README.md


### 添加package.json

## 我是二级标题

```
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```

### 按照官方文档的指示运行npm run docs:dev  进入本地环境时却报了错


![](https://user-gold-cdn.xitu.io/2019/3/14/1697cb2dfa139fda?w=1086&h=162&f=png&s=100972)
>Typ
eError: res.getHeader is not a function

### 最终在github中找到解决方法

![](https://user-gold-cdn.xitu.io/2019/3/14/1697cbe1363b2f3a?w=905&h=471&f=png&s=57145)

>运行npm install webpack-dev-middleware@3.6.0

### 或 修改为以下package.josn 从新安装依赖

```
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  },
  "devDependencies": {
    "vuepress": "^0.14.10",
    "webpack-dev-middleware": "3.6.0"
  }
}
```
### 然后从新运行就可以了

