# cchao-blog

基于[VuePress](https://vuepress.vuejs.org/zh/ "VuePres官方文档")生成的一款博客系统

### 相关依赖

1. [VuePress](https://vuepress.vuejs.org/zh/ "VuePres官方文档")：Vue 驱动的静态网站生成器;
2. [Valine](https://valine.js.org/ "Valine无后台评论系统")：无后端评论系统;

### 开发环境，启动服务
```bash
$ npm run start
```

### 开发环境，调试显示console
```bash
$ npm run dev
```

### 生产环境，构建项目
```bash
$ npm run build
```

### 部署(TODO: 待完善)
```bash
$ npm run upload
```

### 项目目录说明

```
|-- docs                    项目的开发目录
| |-- .vuepress             项目的基本配置
| | |-- components          自定义组件
| | |-- nav                 右上方导航
| | | |-- index.js
| | |-- public              静态资源
| | | |-- logo.png          网站logo
| | |-- theme               自定义主题
| | | |-- config.js
| | |-- index等...          页面目录
| | |-- README.md           自定义首页
|-- dist                    存储构建之后的项目目录
|-- node_modules
|-- .gitignore
|-- package.json            package配置文件
|-- package-lock.json
|-- README.md               你当前所看到的项目说明
```