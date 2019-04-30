module.exports = {
  title: 'cchao',
  description: 'cchao',
  head: [
    ['link', { rel: 'icon', href: '/favicons.png' }]
  ],
  dest: './dist',
  port: '9999',
  themeConfig: {
    serviceWorker: {
      updatePopup: true
    },
    lastUpdated: 'Last Updated',
    nav: require('./nav/index'),
    // 为以下路由添加侧边栏
    sidebar: {
      '/note/': getNoteArticle(),
      '/index/': getIndexeArticle(),
      '/page/': getPageArticle(),
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

function getPageArticle(params) {
  return [
    ['', 'README'],
    ['GithubPages', 'GithubPages'],
    ['VuePress', 'VuePress']
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
      collapsable: true,
      children: [
        '',
        'a',
      ]
    }
  ]
}