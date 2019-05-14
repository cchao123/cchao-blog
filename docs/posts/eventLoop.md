---
title: JS事件循环
headimg: 'https://user-gold-cdn.xitu.io/2017/11/21/15fdd9dfc3293a5c?imageView2/1/w/1304/h/734/q/85/format/webp/interlace/1'
date: 2019/4/21
description: 为什么js设计为单线程？ 单线程为什么要存在异步操作？ 单线程又是如何实现的异步？ 今天，简单总结一下js中的事件循环，了解代码的执行过程。
tags:
  - JS
  - eventLoop
---




## js设计为单线程
::: tip js设计为单线程还是跟他的用途有关
  试想一下 如果js设计为多线程 那么同时修改和删除同一个dom 浏览器又该如何执行?
:::

![](https://user-gold-cdn.xitu.io/2019/4/30/16a6caffd41710b3?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)


## js需要异步

```javascript
for (var i=0;i<9999;i++){
  console.log("我在执行 但用户不知道")
}
console.log("你好啊")
```
::: tip 上图例子 for循环耗时会很久
  这意味着 用户得不到 '你好啊' 的响应 就会下意识会认为浏览器卡死了 所以js必须要有异步
  <br />
  <br />
  js通过事件循环来实现异步 这也是js的运行机制
:::

#### 一方面代码慢慢跑着 另一方面用户已经抓狂
![](https://user-gold-cdn.xitu.io/2019/4/30/16a6cb02c8125c9c?imageslim)


## js事件循环

::: tip  一、归类
 遇到同步任务直接执行,遇到异步任务分类为`宏任务(macro-task)`和`微任务(micro-task)`。
<br />
<br />
宏任务：整体的`Script` `setTimeout` `setInterval`
 <br />
微任务：`Promise` `process.nextTick`
 :::

 ![](https://image-static.segmentfault.com/386/112/386112937-5a5763d9ef823_articlex)

请看示例代码：
```javascript
// 这是一个同步任务
console.log('1')            --------> 直接被执行
                                      目前打印结果为：1

// 这是一个宏任务
setTimeout(function () {    --------> 整体的setTimeout被放进宏任务列表
  console.log('2')                    目前宏任务列表记为【s2】
});

new Promise(function (resolve) {
  // 这里是同步任务
  console.log('3');         --------> 直接被执行
  resolve();                          目前打印结果为：1、3
  // then是一个微任务
}).then(function () {       --------> 整体的then[包含里面的setTimeout]被放进微任务列表
  console.log('4')                    目前微任务列表记为【t45】
  setTimeout(function () {
    console.log('5')
  });
});

```

```javascript
第一轮小结：
执行到这里的结果：1、3

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

::: tip 二、有微则微，无微则宏
如果微任务列表里面有任务 会执行完毕后在执行宏任务 （ps:开篇有流程图）
:::

```javascript
浏览器瞅了一眼微任务列表 发现里面有微任务 就开始全部执行
then(function () {
  console.log('4')            --------> 直接被执行
                                        目前打印结果为：1、3、4
  setTimeout(function () {    --------> 被放进宏任务列表了
    console.log('5')                    目前宏任务列表记为【s2、s5】
  });
});


浏览器发现微任务执行完毕了

开始执行宏任务列表

setTimeout(function () {
  console.log('2')   --------> 直接被执行
                               目前打印结果为：1、3、4、2

});

setTimeout(function () {
  console.log('5')   --------> 直接被执行
                               目前打印顺序为： 1、3、4、2、5、5
});

最终结果为： 1、3、4、2、5

```


::: tip 三、总结 + 实战
反复执行以上步骤 就是事件循环(event loop)
一定要分的清任务类型 (宏任务 和 微任务)
:::


```javascript
  TIP: 为了容易辨别起名为p1（p开头 里面打印1）
  process.nextTick(function() {         --------> 被放微任务列表
    console.log('1');                             微任务列表记为：【p1】
  })

  new Promise(function (resolve) {
    console.log('2');                   --------> 直接执行
    resolve();                                    目前打印顺序为：2
  }).then(function () {                 --------> 整体的then被放进微任务列表[包含其中的setTimeout 4]
    console.log('3');                             微任务列表记为：【p1 t34】
    setTimeout(function () {
      console.log('4')
    });
  });

  setTimeout(function () {              --------> 被放宏任务列表
    console.log('5')                              宏任务列表记为：【s5】
  });

  new Promise(function (resolve) {
    setTimeout(function () {            --------> 被放宏任务列表
      console.log('6')                            宏任务列表记为：【s5 s6】
    });
    resolve()
  }).then(function () {                 --------> 整体的then被放进微任务列表[包含其中的setTimeout和其中的多层嵌套]
    setTimeout(function () {                      微任务列表记为：【p1 t34 t789】
      console.log('7')
      new Promise(function (resolve) {
        setTimeout(function () {
          console.log('8')
        });
        resolve()
      }).then(function () {
        setTimeout(function () {
          console.log('9')
        });
      });
    });
  });
  console.log('10')                      --------> 直接执行
                                                   目前打印顺序为：2、10
```
```javascript
第一轮小结：
执行结果为：2、10

宏任务列表如下：
// s5
setTimeout(function () {
  console.log('5')
});
//s6
setTimeout(function () {
  console.log('6')
});

微任务列表如下：
// p1
process.nextTick(function() {
  console.log('1');
})
// t34
then(function () {
  console.log('3');
  setTimeout(function () {
    console.log('4')
  });
});
// t789
then(function () {
  setTimeout(function () {
    console.log('7')
    new Promise(function (resolve) {
      setTimeout(function () {
        console.log('8')
      });
      resolve()
    }).then(function () {
      setTimeout(function () {
        console.log('9')
      });
    });
  });
```

```javascript
开始执行第二轮：
有微任务 先执行微任务
将微任务列表代码块搬下来
// p1
process.nextTick(function() {             --------> 执行p1
  console.log('1');                                 目前打印顺序为：2、10、1
})
// t34
then(function () {
  console.log('3');                       --------> 直接执行
                                                    目前打印顺序为：2、10、1、3
  setTimeout(function () {                --------> 被放宏任务列表
    console.log('4')                                宏任务列表记为：【s5 s6 s4】
  });
});
// t789
then(function () {
  setTimeout(function () {              --------> 被放宏任务列表
    console.log('7')                              宏任务列表记为：【s5 s6 s4 s789】
    new Promise(function (resolve) {
      setTimeout(function () {
        console.log('8')
      });
      resolve()
    }).then(function () {
      setTimeout(function () {
        console.log('9')
      });
    });
  });
})

微任务执行完毕了 该执行我们的宏任务列表了
因为微任务里面包含一部分宏任务
所以现在的宏任务列表已经增加了
现在把当前的宏任务列表搬下来
//s5
setTimeout(function () {           --------> 执行s5
  console.log('5')                           目前打印顺序为：2、10、1、3、5
});
//s6
setTimeout(function () {           --------> 执行s6
  console.log('6')                           目前打印顺序为：2、10、1、3、5、6
});
//s4
setTimeout(function () {           --------> 执行s4
  console.log('4')                           目前打印顺序为：2、10、1、3、5、6、4
});
// s789
setTimeout(function () {           --------> 执行s789
  console.log('7')                           目前打印顺序为：2、10、1、3、5、6、4、7
  new Promise(function (resolve) {
    setTimeout(function () {       --------> 被放宏任务列表
      console.log('8')                       宏任务列表记为：【s8】
    });
    resolve()
  }).then(function () {            --------> 整体的then被放微任务列表[包含里面的setTimeout]
    setTimeout(function () {                 微任务列表记为：【t9】
      console.log('9')
    });
  });
});
```

```javascript
再次小结：
当前结果：2、10、1、3、5、6、4、7
马上就要执行完了心里万分激动啊 （ 浏览器的内心独白 ^▽^  ...）
宏任务列表如下：
// s8
setTimeout(function () {
  console.log('8')
});

微任务列表如下：
// t9
then(function () {
  setTimeout(function () {
    console.log('9')
  });
});


继续执行 依旧遵循有微则微 无微则宏
浏览器发现有一条微任务
那就开始执行吧~
//t9
then(function () {
  setTimeout(function () {   --------> 执行t9 把里面的setTimeout放入宏任务列表
    console.log('9')                   宏任务列表记为：【s8 s9】
  });
});

微任务列表执行完毕
开始执行宏任务（宏任务刚刚又有新增哦~[s9]）
// s8
setTimeout(function () {     --------> 执行s8
  console.log('8')                     目前打印顺序为：2、10、1、3、5、6、4、7、8
});
// s9
setTimeout(function () {     --------> 执行s9
  console.log('9')                     目前打印顺序为：2、10、1、3、5、6、4、7、8、9
});

到这里 微任务列表 和 宏任务列表均为空 就执行完毕了
```



再此留下一道没有答案的题供练手

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
    process.nextTick(function() {
      console.log('4');
    })
    process.nextTick(function() {
      console.log('5');
    })
  });

  new Promise(function (resolve) {
    console.log('6');
    resolve();
    setTimeout(function () {
      console.log('7')
      new Promise(function (resolve) {
        console.log('8');
        resolve();
      }).then(function () {
        setTimeout(function () {
          console.log('9')
        });
      });
    });

  }).then(function () {

    setTimeout(function () {
      console.log('10')
    });

    new Promise(function (resolve) {
      console.log('11');
      resolve();
    }).then(function () {
      setTimeout(function () {
        console.log('12')
      });
    });
  });

```
::: warning 本人学识有限 文章多有不足
若有错误 请大方指出 以免误导他人
:::