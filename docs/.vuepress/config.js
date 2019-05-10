module.exports = {
  title: 'cchao',
  description: 'cchao',
  head: [
    ['link', { rel: 'icon', href: '/favicons.png' }]
  ],
  dest: './dist',
  port: '9999',
  themeConfig: {
    logo: 'https://raw.githubusercontent.com/2020807070/cchao-blog/feature/layout/docs/.vuepress/public/logo.png',
    serviceWorker: {
      updatePopup: true
    },
    lastUpdated: 'Last Updated',
    nav: require('./nav/index'),
    // 为以下路由添加侧边栏
    sidebar: {
      '/note/': getNoteArticle(),
      '/git/': getGiteArticle(),
    }
  }
}

function getIndexeArticle(params) {
  return [
    ['', 'README'],
    ['indexTwo', '导航第二页']
  ]
}

function getGiteArticle(params) {
  return [
    ['', 'Git项目版本管理规范说明'],
    ['git-commit', 'Git提交规范'],
    ['tool', '相关工具']
  ]
}

function getNoteArticle(params) {
  return [
    {
      title: 'JavaScript',
      collapsable: false,
      children: [
        '',
        'a',
      ]
    },
    {
      title: 'Note',
      collapsable: false,
      children: [
        'b'
      ]
    }
  ]
}