---
title: Node爬虫抓取数据
headimg: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=777242464,306041244&fm=173&app=25&f=JPEG?w=640&h=320&s=DCC9C20B1A2008909605ECDC0100C0B3'
date: 2019/4/25
description: 实战抓取图片数据并下载高清图到本地。
tags:
  - node
  - cheerio
---





### 所用到的模块
- http:创建服务、处理流相关
- fs：操作文件及文件夹(读、写)
- cheerio：简单粗暴的理解为node界的juquey


#### 先爬来整张网页
```javascript
// 引入所需模块
var http = require('http');
var cheerio = require('cheerio');
var fs = require('fs');
// 定义爬取目标站
var Url = 'http://sc.chinaz.com/tupian/'
http.get(Url, function (res) {
  var htmlDate = '';
  // 获取页面数据
  res.on('data', function (chunk) {
    htmlDate += chunk;
  });
  // 数据获取结束
  res.on('end', function () {
    // 过滤页面
    filterContent(htmlDate);
  });
}).on('error', function () {
  console.log('获取数据出错！');
});
```

#### 过滤
```javascript
// 过滤页面信息
function filterContent(htmlDate) {
  if (htmlDate) {
    var $ = cheerio.load(htmlDate);
    // 根据id获取轮播图列表信息
    var Content = $('#container');
    // 轮播图数据
    var ContentData = [];
    /* 轮播图列表信息遍历 */
    Content.find('.box').each(function (item, b) {
      var pic = $(this);
      var src = formatUrl(pic.find('a').children('img').attr('src2'));
      var name = formatUrl(pic.find('a').children('img').attr('alt'));
      download(src, name)
      ContentData.push({
        src,
        name
      })
    });
    console.log(ContentData)
  } else {
    console.log('html null');
  }
}
```



![](https://user-gold-cdn.xitu.io/2019/5/15/16ab94b6c883ac6a?w=642&h=161&f=png&s=22958)
> 抓取链接都带有_s是缩略图 需要一个方法帮来转换
```javascript
// 或取高清链接
function formatUrl(imgUrl) {
  return imgUrl.replace('_s', '')
}
```


```javascript
// 图片下载函数
function download(url, name) {
  http.get(url, function (res) {
    let imgData = '';
    //设置图片编码格式
    res.setEncoding("binary");
    //检测请求的数据
    res.on('data', (chunk) => {
      imgData += chunk;
    })
    res.on('end', () => {
        // 没有文件夹则创建 以防报错
      if (!fs.existsSync('./images')) {
        fs.mkdirSync('./images');
      };
      fs.writeFile(`./image/${name}.jpg`, imgData, 'binary', (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log(`${name}----下载成功！`)
        }
      })
    })
  })
}
```

#### 成果展示


![](https://user-gold-cdn.xitu.io/2019/5/15/16ab95e6602948f5?w=1193&h=529&f=jpeg&s=101228)
