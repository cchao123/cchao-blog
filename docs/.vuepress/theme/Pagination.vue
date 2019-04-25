<template>
  <ul class="pagination-wrap">
    <li>←</li>
    <li v-if="!total">{{ currentPage }}</li>
    <li v-else v-for="item in Math.ceil(total / pageSize)" :key="item" @click="pageTurning(item)">{{ item }}</li>
    <li>→</li>
  </ul>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      default: 1 // 当前页码
    },
    total: {
      type: Number,
      default: 0 // 总条目数
    },
    pageSize: {
      type: Number,
      default: 10 // 一页几条
    }
  },
  data () {
    return {

    }
  },
  methods: {
    pageTurning (item) {
      console.log(item)
    }
  }
}
</script>

<style lang="stylus">
.pagination-wrap
  list-style none
  display flex
  background #fff
  margin-bottom 20px
  border-radius 8px
  padding 30px 0
  li
    align-items center
    justify-content center
    display flex
    margin 0 2px
    width 30px
    height 30px
    border-radius 8px
    box-shadow 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12)
</style>