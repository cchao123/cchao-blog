module.exports = {
  title: '大米饭 香喷喷',
  description: '描述陈晨',
  head: [
    ['link', { rel: 'icon', href: '/favicons.png' }]
  ],
  dest: './dist',
  port: '9999',
  themeConfig: {
    lastUpdated: '更新时间',
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
  return null
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
    },
    {
      title: 'Node',
      children: [

      ]
    },
    {
      title: 'Vue',
      children: [

      ]
    }
  ]
}