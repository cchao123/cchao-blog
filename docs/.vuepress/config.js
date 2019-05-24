module.exports = {
  // theme: 'cchao',
  title: 'cchao',
  description: 'cchao',
  head: [
    ['link', { rel: 'icon', href: '/favicons.png' }]
  ],
  dest: './dist',
  port: '9999',
  themeConfig: {
    logo: 'http://cchao.123hao123.top/images/logo.png',
    serviceWorker: {
      updatePopup: true
    },
    lastUpdated: 'Last Updated',
    nav: require('./nav/index'),
    // 为以下路由添加侧边栏
    sidebar: {
      '/note/': getNoteArticle(),
      '/theme/': getThemeArticle(),
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

function getThemeArticle(params) {
  return [
    {
      title: '主题安装指南',
      collapsable: false,
      children: [
        ''
      ]
    },
    {
      title: '不想手动配置？',
      collapsable: false,
      children: [
        'cchao-cli'
      ]
    }
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