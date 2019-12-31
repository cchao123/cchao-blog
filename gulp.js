const $gulp = require('gulp')
const $filter = require('gulp-filter')

const $template = require('gulp-template')
const $inquirer = require('inquirer')
const $rename = require('gulp-rename')
const $conflict = require('gulp-conflict')
const $merge = require('merge-stream')

const $imagemin = require('gulp-imagemin')
const $imageminWebp = require('imagemin-webp')

const $config = require('./config/project')



/**
 * 判断字母是否是大写
 * @param {string} ch 字母
 */
function isUpperCase (ch) {
  if (ch.length !== 1) return false
  return /[A-Z]/.test(ch)
}

// 创建初始页面
let prompts = [{
  name: 'pageName',
  message: '页面名称，首字母大写?',
  validate: function (pageName) {
    if (!pageName && pageName.trim() === '') return '不能为空'
    if (!isUpperCase(pageName.substr(0, 1))) return '页面首字母必须大写'
    return true
  }
}, {
  name: 'pageTitle',
  message: '页面标题（）?',
  default: ''
}, {
  name: 'pageDesc',
  message: '页面描述（）？',
  default: ''
}, {
  name: 'pageKeyword',
  message: '页面关键词（）？',
  default: ''
}, {
  name: 'pageDestDir',
  message: '页面存储目录（./src/pages/）?',
  default: './src/pages/'
}, {
  type: 'confirm',
  name: 'moveon',
  message: '继续?'
}]

$gulp.task('create', function (done) {
    return
  // Ask
  $inquirer.prompt(prompts).then((answers) => {
    if (!answers.moveon) {
      console.log('你取消的创建页面')
      return done()
    }
    answers.pageNameLowerCase = answers.pageName.toLowerCase()
    var pageConfigFile = './config/page/' + answers.pageName + '.js'
    $merge(
      $gulp.src('template/page/**')
        .pipe($template(answers))
        .pipe($conflict(answers.pageDestDir + answers.pageName + '/'))
        .pipe($gulp.dest(answers.pageDestDir + answers.pageName + '/'))
        .on('end', function () {
          console.log(answers.pageDestDir + answers.pageName + '/[index.js|index.vue|router.js]，组件文件创建成功')
        }),
      $gulp.src('template/page.config.js')
        .pipe($template(answers))
        .pipe($conflict(pageConfigFile))
        .pipe($rename(answers.pageName + '.js'))
        .pipe($gulp.dest('./config/page/'))
        .on('end', function () {
          console.log(answers.pageName + '页面的配置文件创建成功：' + pageConfigFile)
          done()
        })
    )
  })
})
