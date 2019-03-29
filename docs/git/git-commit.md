# Git提交规范

## 整体流程

1. 统一规范：使用WEB前端框架[AngularJS](vscode-resource:/Users/zouyuwei/code/web/_SELF/multi-page-scaffold/.github/(https:/github.com/angular/angular))的 [Git信息提交规范](https:/github.com/angular/angular/blob/master/CONTRIBUTING.md#commit)
2. 规范化工具：使用[Commitizen](vscode-resource:/Users/zouyuwei/code/web/_SELF/multi-page-scaffold/.github/(https:/github.com/ctaodream/cz-cli))工具来规范化提交消息
3. Changelog自动生成工具：使用[conventional-changelog-cli](vscode-resource:/Users/zouyuwei/code/web/_SELF/multi-page-scaffold/.github/(https:/github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-cli))工具自动化生成项目的Changelog信息（针对于Git元数据）

## 一、统一规范

### Commit信息的格式

每次提交，Commit信息都包括三个部分：`header`，`body`，`footer`。

```
<type>(<scope>): <subject> // header
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

例如：

```
fix(release): need to depend on latest rxjs and zone.js

The version in our package.json gets copied to the one we publish, and users need the latest of these.
```

### 1. Header

其中`header`是必须的，包括`type`、`scope`、`subject`三个字段，`header`的`scope`字段是可选的。

### 1.1 Type （ [AngularJS](vscode-resource:/Users/zouyuwei/code/web/_SELF/multi-page-scaffold/.github/(https:/github.com/angular/angular))框架中给出的规范）

- feat： 新功能（feature）
- fix：bug修补
- docs：文档的更改
- perf：代码更改提高性能
- style： 格式的更改（不影响代码运行的变动，比如：空格，代码格式化，丢失分号等）
- refactor：重构（即不是新增功能，也不是修改bug的代码变动）
- test：增加测试或者更正已经存在的测试
- chore：构建过程或辅助工具的变动
- build：更改影响构建系统或者额外的依赖（例如：gulp，npm）
- ci：更改CI配置文件和脚本（例如：Travis，Circle）

### 1.2 Scope

用于描述更改内容影响的范围或文件，例如：

```
docs(changelog): update change log to beta.5
docs(readme.md): update readme
```

### 1.3 Subject

主要是对于提交目的的简短描述。

### 2. Body

Body部分主要是针对本次 `commit` 的详细描述。使用现在时；而且应该说明代码变动的动机，以及和上一次变动行为进行对比。

### 3. Footer

包括两种情况

1）Breaking changes （不兼容变动）

> [Breaking changes wiki](vscode-resource:/Users/zouyuwei/code/web/_SELF/multi-page-scaffold/.github/(https:/en.wiktionary.org/wiki/breaking_change)) A change in one part of a software system that potentially causes other components to fail; occurs most often in shared libraries of code used by multiple applications 软件系统的一个部分发生变化，可能导致其他组件发生故障;在多个应用程序使用的共享代码库中经常出现.

需要以 `BREAKING CHANGE:` 开头，紧跟一个空格或者两个空行，后面是本次变动的描述信息。

2） Referencing issues （引用问题）

本次代码的变动如果也针对某个 `issue` 的关闭，那么以 `"Closes"`关键词开头，如：

```
Closes #234
```

### 例子

```
fix($compile): couple of unit tests for IE9

Older IEs serialize html uppercased, but IE9 does not...
Would be better to expect case insensitive, unfortunately jasmine does
not allow to user regexps for throw expectations.

Closes #392
Breaks foo.bar api, foo.baz should be used instead
feat($compile): simplify isolate scope bindings

Changed the isolate scope binding options to:
  - @attr - attribute binding (including interpolation)
  - =model - by-directional model binding
  - &expr - expression execution binding

This change simplifies the terminology as well as
number of choices available to the developer. It
also supports local name aliasing from the parent.

BREAKING CHANGE: isolate scope bindings definition has changed and
the inject option for the directive controller injection was removed.

To migrate the code follow the example below:

Before:

scope: {
  myAttr: 'attribute',
  myBind: 'bind',
  myExpression: 'expression',
  myEval: 'evaluate',
  myAccessor: 'accessor'
}

After:

scope: {
  myAttr: '@',
  myBind: '@',
  myExpression: '&',
  // myEval - usually not useful, but in cases where the expression is assignable, you can use '='
  myAccessor: '=' // in directive's template change myAccessor() to myAccessor
}

The removed `inject` wasn't generaly useful for directives so there should be no code using it.
```

## 二、规范化工具：[Commitizen](vscode-resource:/Users/zouyuwei/code/web/_SELF/multi-page-scaffold/.github/(https:/github.com/ctaodream/cz-cli))

Commitizen是撰写规范化 `commit message` 的工具

### 1. 安装

```
$ npm install -g commitizen
```

### 2. 使用

当提交代码的时候，使用 `git cz` 代替 `git commit` 命令，会有如下提示，用来生成符合格式的 `commit message` ![提交提示信息](http://km.oa.com/files/photos/pictures//20180105//1515118457_66.png) ![提交提示的详细步骤](http://km.oa.com/files/photos/pictures//20180105//1515118545_5.png)

注： 如果使用 `[TortoiseGit]` ， `[Sourcetree]` 等图形化Git工具，则只需要按照上面介绍的 “提交规范化格式” 即可。

## 三、[conventional-changelog-cli](vscode-resource:/Users/zouyuwei/code/web/_SELF/multi-page-scaffold/.github/(https:/github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-cli))

> 从git元数据中生成changelog

**注意：**使用 `conventional-changelog-cli` 工具，不是必须使用 `angular` 提交规范。为了让这个工具得到最好的结果，并生成灵活的输出，建议使用一个提交约定。所以这里使用 `angular` 提交规范，这个在上文有介绍。

生成的文档包括：

- Feature
- Fix
- Performance Improvement
- Breaking Changes

**例子：** <https://github.com/btford/grunt-conventional-changelog/blob/master/CHANGELOG.md>

### 推荐的工作流

1. 项目有一些更改
2. 提交这些更改
3. 确保 `Travis` 变成绿色
4. 更改 `package.json` 文件中的项目版本信息
5. 使用 `conventional-changelog-cli` 生成 `changelog` 日志信息
6. 提交 `package.json` 和 `CHANGELOG.md`文件
7. 给这次更改打标签
8. Push代码

### 1. 安装

```
$ npm install -g conventional-changelog-cli
```

### 2. 使用

1）直接命令行

```
$ cd my-project // 进入要生成changelog的项目目录
$ conventional-changelog -p angular -i CHANGELOG.md -s
```

这不会覆盖任何以前的更改日志，只会在 `CHANGELOG.md` 文件的头部加上自从上次发布以来的变动。 （以上生成一个基于自上一个匹配“Feature”，“Fix”，“Performance Improvement”或“Breaking Changes”模式提交的更新日志。）

如果你是第一次使用这个工具，而且想要生成所有以前的changelog，你可以使用下面命令：

```
$ conventional-changelog -p angular -i CHANGELOG.md -s -r 0
```

这将会覆盖先前生成的日志。 所有可用的命令行参数都可以使用CLI列出： `conventional-changelog --help`

2）使用 `npm scripts`

在 `package.json` 文件的 `script` 字段中添加

```
{
  "scripts": {
    "changelog": "conventional-changelog -p angular -i CHANGELOG.md -s -r 0
  }
}
```

以后直接使用 `npm run changelog` 命令来自动生成 changelog

## 四、参考

1. [AngularJS Git Commit Message Conventions](https:/docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit)
2. [Commitizen](vscode-resource:/Users/zouyuwei/code/web/_SELF/multi-page-scaffold/.github/(https:/github.com/ctaodream/cz-cli))
3. [conventional-changelog-cli](vscode-resource:/Users/zouyuwei/code/web/_SELF/multi-page-scaffold/.github/(https:/github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-cli))

