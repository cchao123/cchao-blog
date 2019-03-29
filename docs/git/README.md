# Git项目版本管理规范说明

## 一、 分支

1. 长期存在的两个分支
- `master` : 主分支，负责记录上线版本的迭代，该分支代码与线上代码是完全一致的
- `develop` : 开发分支，该分支记录相对稳定的版本，所有feature分支和bugfix分支都从该分支创建

2. 建议的其他分支命名
- 1）功能（特性）分支：用于开发新的功能
  ```
  feature/分支名称
  ```
- 2）bug修复分支（本项目可以不需要，直接使用feature分支）
  ```
  bugfix/分支名称
  ```
- 3）release分支：预发布分支 （本项目可以不需要，直接使用feature分支）
  ```
  release/分支名称
  ```

## 二、 Tag - 标签，版本管理

采用三段式，v版本.里程碑.序号，如`v1.2.1`

- 架构升级或架构重大调整，修改第1位
- 新功能上线或者模块大的调整，修改第2位
- bug修复上线，修改第3位

## 三、 Git工作流代码示例

> 可以使用 [gitflow](https://github.com/nvie/gitflow) 来进行管理

1. 开始新的feature分支

    ```bash
    # 从develop分支新建feature/new分支
    $ git checkout -b feature/new develop
    # 提交本地分支到远程
    $ git push -u origin feature/new

    # 代码做一些改动后的操作
    $ git status

    # 注意添加自己要提交的文件即可，不要直接使用 `git add .` 命令添加所有的改动文件
    $ git add [file]

    $ git commit # 提交文件
    ```

2. 完成feature分支

    ```bash
    $ git pull origin develop
    $ git checkout develop
    $ git merge --no-ff feature/new
    $ git push origin develop

    $ git branch -d feature/new
    # 如果要删除远程分支
    $ git push origin --delete feature/new
    ```

3. 开始/完成release分支（这个本项目也可以简化，直接从develop分支进行打tag）

    ```bash
    # 全部提测完毕后，发版上线
    $ git checkout -b release/1.0.0 develop

    $ git checkout master
    $ git merge --no-ff release/1.0.0
    $ git push

    $ git branch -d release/1.0.0 # 删除本地分支
    $ git push origin --delete release/1.0.0 # 删除远程分支

    # 打版本标签
    $ git tag -a v1.0.0 master
    $ git push --tags
    ```

4. 标签的操作

   ```bash
   # 查看远程仓库标签
   $ git ls-remote --tags

   # 删除标签
   $ git tag -d v0.1.0

   # 删除远程仓库标签
   $ git push origin :refs/tags/v0.1.0
   ```
