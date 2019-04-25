<template>
  <div class="articl-wrap">
    <div class="articl-flow">
      <div class="atc-item" v-for="item in posts" v-if="isAtc(item.path)">
        <router-link :to="item.path"><p>{{ item.title }}</p></router-link>
        <p>{{ item.frontmatter.date || item.lastUpdated }}</p>
        <p>{{ item.frontmatter.description }}</p>
        <span v-for="tag in item.frontmatter.tags">{{ tag }}</span>
      </div>
      <Pagination />
    </div>
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

export default {
  components: { Pagination , AboutMe, HotArticle , Categories},
  data () {
    return {
      page: 1,
      total: 10
    }
  },
  props: {
   posts: {
      type: Array,
      default: []
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
.articl-wrap
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
</style>
