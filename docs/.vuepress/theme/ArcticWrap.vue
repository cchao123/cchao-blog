<template>
  <div class="articl-wrap">
    <div class="articl-flow">
      <div class="atc-item" v-for="item in posts" v-if="isAtc(item.path)">
        <router-link :to="item.path"><p>{{ item.title }}</p></router-link>
        <p>{{ item.frontmatter.date || item.lastUpdated | formatTime('yyyy-MM-dd') }}</p>
        <p>{{ item.frontmatter.description }}</p>
        <span v-for="tag in item.frontmatter.tags">{{ tag }}</span>
      </div>
      <slot name="content"></slot>
      <Pagination v-if="posts" />
    </div>
    <!-- TODO 窗口缩小就隐藏 -->
    <div class="articl-aside">
      <AboutMe />
      <!-- <HotArticle /> -->
      <Categories />
      <!-- <Sidebar /> -->
    </div>
  </div>
</template>

<script>
import Pagination from "./Pagination.vue";
import AboutMe from "./AboutMe.vue";
import HotArticle from "./AboutMe.vue";
import Categories from "./Categories.vue";
import { formatTime } from './date.js'
export default {
  components: { Pagination , AboutMe, HotArticle , Categories},

  filters: {
    formatTime (time, format) {
      return formatTime(time, format)
    }
  },
  data () {
    return {
      page: 1,
      total: 10
    }
  },
  props: {
   posts: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
    // 一个新的数组来存放
    // 然后排序
    // 然后通过数组截取来做分页
    isAtc (file) {
      if (/posts/.test(file)) return true
    },
  },
}
</script>

<style lang="stylus">
@import './styles/config.styl'
.content
  background #fff
  border-radius 8px

.articl-wrap
  padding: $navbarHeight 0rem 0;
  max-width 1200px
  margin 0 auto
  margin-top 20px
  display flex
  .articl-flow
    flex: 1
  .articl-flow
    .atc-item
      background #fff
      margin-bottom 20px
      padding 20px 30px
      border-radius 8px
  .articl-aside
    margin-bottom 20px
    width 300px
    margin-left 20px


@media (max-width: $MQNarrow)
  .articl-aside
    display none

@media (max-width: $MQNarrow) and (min-width: $MQMobile)
  .articl-aside
    display none


</style>
