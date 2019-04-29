---
title: JS事件循环
date: 2019/4/25
description: 微信小程序最近被吐槽最多的一个更改，就是用户使用wx.getUserInfo（开发和体验版）时不会弹出授权，正式版不受影响。现在授权方式是需要引导用户点击一个授权按钮，然后再弹出授权。我最近围绕这个做了一些研究，来看看我是如何做好这个授权。
tags:
  - 美食
  - 娱乐
---

![](https://image-static.segmentfault.com/386/112/386112937-5a5763d9ef823_articlex)

::: tip  一：归类
 遇到同步任务直接执行,遇到异步任务分类为`宏任务(macro-task)`和`微任务(micro-task)`。
 :::

```javascript
// 这是一个同步任务
console.log('1')            --------> 直接被执行

// 这是一个宏任务
setTimeout(function () {    --------> 整体的setTimeout被放进宏任务列表
  console.log('2')
});

new Promise(function (resolve) {
  // 这里是同步任务
  console.log('3');         --------> 直接被执行
  resolve();
  // then是一个微任务
}).then(function () {       --------> 整体的then[包含里面的setTimeout]被放进宏任务列表
  console.log('4')
  setTimeout(function () {
    console.log('5')
  });
});


目前打印顺序为： 1、3

宏任务列表如下：

setTimeout(function () {
  console.log('2')
});

微任务列表如下：
then(function () {
  console.log('4')
  setTimeout(function () {
    console.log('5')
  });
});
```

::: tip 宏 - 归类完毕 开始执行宏任务
This is a tip
:::

```javascript
浏览器瞅了一眼微任务列表 发现里面有微任务 就开始全部执行
then(function () {
  console.log('4')            --------> 直接被执行
  setTimeout(function () {    --------> 被放进宏任务列表了
    console.log('5')
  });
});

目前打印顺序为： 1、3、4

宏任务列表如下：

setTimeout(function () {
  console.log('2')
});

setTimeout(function () {
  console.log('5')
});
微任务列表如下：

  空空如也~


浏览器发现微任务里没有任务了,所以开始执行宏任务了
setTimeout(function () {
  console.log('2')   --------> 直接被执行
});

setTimeout(function () {
  console.log('5')   --------> 直接被执行
});

目前打印顺序为： 1、3、4、2、5
```


::: tip 三:有微改微，无微加宏
This is a tip
:::


```javascript

  process.nextTick(function() {
    console.log('6');
  })

  new Promise(function (resolve) {
    console.log('1');
    resolve();
  }).then(function () {
    console.log('2');
    setTimeout(function () {
      console.log('3')
    });
  });

  setTimeout(function () {
    console.log('4')
  });

  new Promise(function (resolve) {
    setTimeout(function () {
      console.log('5')
    });
    resolve()
  }).then(function () {
    setTimeout(function () {
      console.log('6')
      new Promise(function (resolve) {
        setTimeout(function () {
          console.log('7')
        });
        resolve()
      }).then(function () {
        setTimeout(function () {
          console.log('8')
        });
      });
    });
  });
```

```javascript
  new Promise(function (resolve) {
    console.log('1');
    resolve();
  }).then(function () {
    setTimeout(function () {
      console.log('2')
    });
  });

  setTimeout(function () {
    console.log('3')
  });

  setTimeout(function () {
    console.log('4')
  });

  new Promise(function (resolve) {
    console.log('5');
    resolve();
    setTimeout(function () {
      console.log('6')
      new Promise(function (resolve) {
        console.log('7');
        resolve();
      }).then(function () {
        setTimeout(function () {
          console.log('8')
        });
      });
    });

  }).then(function () {

    setTimeout(function () {
      console.log('9')
    });

    new Promise(function (resolve) {
      console.log('10');
      resolve();
    }).then(function () {
      setTimeout(function () {
        console.log('11')
      });
    });
  });
```