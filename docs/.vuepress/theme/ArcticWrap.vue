<template>
  <div>
    <div class="atc-item" v-for="item in posts">
      <router-link :to="item.path"><p v-if="isAtc(item.path)">{{ item.title }}</p></router-link>
    </div>
    <!-- 分页器 -->
  </div>
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