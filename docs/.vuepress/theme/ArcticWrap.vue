<template>
  <div class="arctic-wrap">
    <div class="arctic-flow">
      <div class="atc-item" v-for="item in posts" v-if="isAtc(item.path)">
        <router-link :to="item.path"><p>{{ item.title }}</p></router-link>
      </div>
      <Pagination />
    </div>
    <div class="arctic-aside">
      121321321321
    </div>
  </div>
    <!-- 分页器 -->

</template>

<script>
import Pagination from "./Pagination.vue";
export default {
  components: { Pagination },
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
.arctic-wrap
  margin-top 20px
  display flex
  .arctic-flow
    flex: 1
  .arctic-flow
    .atc-item
      background #fff
      margin-bottom 20px
      padding 20px 5px
      border-radius 8px
  .arctic-aside
    margin-bottom 20px
    width 300px
    margin-left 20px
    background #fff
</style>
