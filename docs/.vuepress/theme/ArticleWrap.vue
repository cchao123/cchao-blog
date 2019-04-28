<template>
  <div class="articl-wrap">
    <div class="articl-flow">
      <div class="articl-item" v-for="item in posts" v-if="isAtc(item)">
        <h3 class="articl-title"><router-link :to="item.path">{{ item.title }}</router-link></h3>
        <div class="articl-date"><i class="iconfont iconrili"></i>{{ item.frontmatter.date || item.lastUpdated | formatTime('yyyy-MM-dd') }}</div>
        <div class="articl-date">{{ item.frontmatter.description }}</div>
        <div class="articl-tag" v-if="item.frontmatter.tags">
          <span v-for="tag in item.frontmatter.tags">{{ tag }}</span>
        </div>
      </div>
      <!-- 文章主题 -->
      <slot name="content"></slot>
      <!-- 分页器 -->
      <Pagination v-if="posts.length" :currentPage="currentPage" :total="total" />
    </div>
    <!-- 侧边栏 -->
    <div class="articl-aside">
      <!-- 关于作者 -->
      <AboutMe />
      <FollowMe />
      <!-- 标签分类 -->
      <Tags />

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
import Tags from "./Tags.vue";
import FollowMe from "./FollowMe.vue";
import { formatTime } from './date.js'
import { resolveSidebarItems } from './util'


export default {

  components: { Pagination , AboutMe, HotArticle , Categories, Tags , FollowMe},

  filters: {
    formatTime (time, format) {
      return formatTime(time, format)
    }
  },
  data () {
    return {
      currentPage: 1,
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
      if (/posts/.test(file.path)) return true
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

  .articl-tag
    span
      transition 0.3s
      font-size 14px
      background #e0e0e0
      color #333333
      padding 2px 5px
      margin-right 5px
      &:hover
        background #a161bf
        color #fff



@media (max-width: $MQNarrow)
  .articl-aside
    display none
  // .articl-wrap
  //   margin-top 0

@media (max-width: $MQNarrow) and (min-width: $MQMobile)
  .articl-aside
    display none


</style>
