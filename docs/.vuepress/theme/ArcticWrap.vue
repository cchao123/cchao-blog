<template>
  <div class="arctic-wrap">
    <div class="arctic-flow">
      <div class="atc-item" v-for="item in posts">
        <router-link :to="item.path"><p v-if="isAtc(item.path)">{{ item.title }}</p></router-link>
      </div>
    </div>
    <div class="arctic-other">
      121321321321
    </div>
  </div>
    <!-- 分页器 -->

</template>

<script>
export default {
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
  display flex
  .arctic-flow
    flex: 1
  .arctic-flow
    background #ccc
  .arctic-other
    width 300px
    margin-left 20px
    background #ccc
</style>
