module.exports = {
  theme: 'cchao',
  title: 'cchao',
  description: 'cchao',
  head: [
    ['link', { rel: 'icon', href: '/favicons.png' }]
  ],
  dest: './dist',
  port: '9999',
  themeConfig: {
    // 这里修改logo图片
    logo: 'https://raw.githubusercontent.com/2020807070/cchao-blog/feature/layout/docs/.vuepress/public/logo.png',
    serviceWorker: {
      updatePopup: true
    },
    lastUpdated: 'Last Updated',
    nav: require('./nav/index'),
    // 为以下路由添加侧边栏
    sidebar: {
      '/note/': getNoteArticle(),
      '/theme/': getThemeArticle(),
      '/food/': getFoodeArticle(),
    }
  }
}

function getIndexeArticle(params) {
  return [
    ['', 'README'],
    ['indexTwo', '导航第二页']
  ]
}

function getFoodeArticle(params) {
  return [
    ['', '蔬菜简介'],
    ['Fruits', '水果简介']
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