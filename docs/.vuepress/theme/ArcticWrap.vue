<template>
  <div class="articl-wrap">
    <div class="articl-flow">
      <div class="articl-item" v-for="item in posts" v-if="isAtc(item.path)">
        <h3 class="articl-title"><router-link :to="item.path"><p>{{ item.title }}</p></router-link></h3>
        <div class="articl-date"><i class="iconfont iconrili"></i>{{ item.frontmatter.date || item.lastUpdated | formatTime('yyyy-MM-dd') }}</div>
        <div class="articl-date">{{ item.frontmatter.description }}</div>
        <div class="articl-tag" v-if="item.frontmatter.tags">
          <i class="iconfont iconbiaoqian"></i>
          <span v-for="tag in item.frontmatter.tags">{{ tag }}</span>
        </div>
      </div>
      <!-- 文章主题 -->
      <slot name="content"></slot>
      <!-- 分页器 -->
      <Pagination v-if="posts.length" />
    </div>
    <!-- 侧边栏 -->
    <div class="articl-aside">

      <AboutMe />
      <!-- <HotArticle />v-if="sidebarItems.length" -->
      <Categories :categories="sidebarItems"/>
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
import { resolveSidebarItems } from './util'


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
  computed: {
    sidebarItems () {
      return resolveSidebarItems(
        this.$page,
        this.$route,
        this.$site,
        this.$localePath
      )
    },
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
    position relative
    flex: 1
    width 100%
    .articl-item
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
  // .articl-wrap
  //   margin-top 0

@media (max-width: $MQNarrow) and (min-width: $MQMobile)
  .articl-aside
    display none


</style>
