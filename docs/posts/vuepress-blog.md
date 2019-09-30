---
title: 脸贴脸带你用Vuepress撸一个定制博客并发布
coverMap: 'http://cchao.123hao123.top/%E6%9C%AA%E6%A0%87%E9%A2%98-4.png'
date: 2019/4/25
description: 搭建一款静态博客，包含评论功能。
tags:
  - vuepress
  - blog
---

<!-- https://vuepress.vuejs.org/ -->
## vuepress 博客
VuePress 由两部分组成：一部分是支持用 Vue 开发主题的极简静态网站生成器，另一个部分是为书写技术文档而优化的默认主题。它的诞生初衷是为了支持 Vue 及其子项目的文档需求。

每一个由 VuePress 生成的页面都带有预渲染好的 HTML，也因此具有非常好的加载性能和搜索引擎优化（SEO）。同时，一旦页面被加载，Vue 将接管这些静态内容，并将其转换成一个完整的单页应用（SPA），其他的页面则会只在用户浏览到的时候才按需加载。




## 基本配置

### 配置文件
```
.
├─ docs
│  ├─ README.md
│  └─ .vuepress
│     └─ config.js
└─ package.json
```
### 主题配置

丑？ 丑就对了！

博客皮肤

## 接入评论

Valine - 一款快速、简洁且高效的无后端评论系统。

### 注册账号并创建应用
https://leancloud.cn/ 注册账号

个人的话免费开发版本就够用了

![](https://user-gold-cdn.xitu.io/2019/5/31/16b0bdff539b9acd?w=599&h=442&f=png&s=28444)


### 点击设置进入详情

![](https://user-gold-cdn.xitu.io/2019/5/31/16b0be2f3eb4285a?w=510&h=156&f=png&s=12283)

#### 进入应用Key

 复制 `AppId` 和 `AppKey` 替换入下面的组件

![](https://user-gold-cdn.xitu.io/2019/5/31/16b0be3a085bfaff?w=927&h=301&f=png&s=26473)



### 复制以下代码片段
```javascript
<template>
  <div class="vcomment">
    <div id="vcomments"></div>
  </div>
</template>

<script>
export default {
  mounted: function() {
    this.createValine();
  },
  methods: {
    createValine() {
      const Valine = require("valine");
      window.AV = require("leancloud-storage");
      const valine = new Valine({
        el: "#vcomments",
        appId: '<你的AppId>',
        appKey: '<你的appKey>',
        notify: false,
        verify: false,
        avatar: "monsterid",
        path: window.location.pathname,
        placeholder: "来谈一谈对这篇文章的看法吧~"
      });
      this.valineRefresh = false;
    }
  },
  watch: {
    $route(to, from) {
      if (to.path !== from.path) {
        setTimeout(() => {
          //重新刷新valine
          this.createValine();
        }, 300);
      }
    }
  }
};
</script>
```



## 发布github

 ### 使用github托管页面
 省去了买空间或者服务器的钱💰
首先登陆自己的github

右上角头像旁边的➕ --->  `New repository`

![](https://user-gold-cdn.xitu.io/2019/5/30/16b0659ea6a51e67?w=475&h=258&f=png&s=12313)



```!
GitHub要站点的仓库名称必须是 用户名.github.io

比如我的是2020807070.github.io
```



然后把打包的dist文件拖出来

上传就可以了

然后访问用户名.github.io

想绑定自己的域名怎么办？ 请继续往下看

以阿里云为例：

登录-> 控制台 -> 域名

点击`解析`

![](http://cchao.123hao123.top/20190906-jx1.png)

点击`添加记录`

![](http://cchao.123hao123.top/20190906-jx2.png)

记录类型选择`CNAME`

![](http://cchao.123hao123.top/20190906-jx3.png)



### 解析域名

创建`CNAME`文件夹放置与根目录

![](https://user-gold-cdn.xitu.io/2019/5/31/16b0b923807f573c?w=637&h=265&f=png&s=35435)

icon

































## 懒癌晚期患者请直接看这里


### 安装脚手架
```
$ npm i cchao-cli -g
```

### 输入命令
```
$ cchao-cli init
```


### 功能演示
![](http://cchao.123hao123.top/20190906-cchao-cli.gif)



### 下载依赖
```
$ npm install
```



### 运行项目
```
$ npm run start
```
