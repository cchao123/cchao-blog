```
             __                      __    __
  __________/ /_  ____ _____        / /_  / /___  ____ _
 / ___/ ___/ __ \/ __ `/ __ \______/ __ \/ / __ \/ __ `/
/ /__/ /__/ / / / /_/ / /_/ /_____/ /_/ / / /_/ / /_/ /
\___/\___/_/ /_/\__,_/\____/     /_.___/_/\____/\__, /
                                               /____/
```
基于[VuePress](https://vuepress.vuejs.org/zh/ "VuePres官方文档")生成的一款博客系统。

![](https://img.shields.io/badge/vuepress-0.14.10-brightgreen.svg)

### [预览地址](http://123hao123.top)

### 目录
- [相关依赖](#相关依赖)
- [开发指南](#开发指南)
- [项目目录结构](#项目目录结构)


### 相关依赖

1. [VuePress](https://vuepress.vuejs.org/zh/ "VuePres官方文档")：Vue 驱动的静态网站生成器;
2. [Valine](https://valine.js.org/ "Valine无后台评论系统")：无后端评论系统;
3. [vuepress-theme-cchao](https://github.com/2020807070/vuepress-theme-cchao "此博客使用的vuepress主题")：vuepress主题;


### 开发指南

## 开发环境，启动服务
```bash
$ npm run start
```

## 开发环境，调试显示console
```bash
$ npm run dev
```

## 生产环境，构建项目
```bash
$ npm run build
```

## 部署(TODO: 待完善)
```bash
$ npm run upload
```

### 项目目录结构

```
├──  docs
| ├── .vuepress             项目的开发目录
| | ├── nav                 右上方导航
| | | └── index.js
| | ├── public              静态资源
| | | └── logo.png          网站logo
| | | └── config.js         配置文件
| ├── posts                 放置文章
| ├── README.md             自定义首页
├── dist                    存储构建之后的项目目录
├── node_modules
├── .gitignore
├── package.json            package配置文件
├── package-lock.json
└──  README.md              你当前所看到的项目说明
```


Author：cchao




npm run create

/pages/xxx.md
```
---
# 使用自定义页面
layout: CustomPage
# 页面名称
page: xxx
---
```



- [x] 加载屏幕
- [x] 自定义页面
- [ ] 自定义页面 - 命令式
- [ ] logo
- [ ] 分类
- [ ] 支持文章排序
