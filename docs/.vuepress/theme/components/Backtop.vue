<!-- Backtop 回到顶部 -->
<template>
  <div v-show="isShow" @click="backTop" class="back-top iconfont iconicon-test"></div>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    backTop() {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
  }
};
</script>

<style lang="stylus" scoped>
.back-top {
  cursor: pointer;
  border-radius: 50%;
  position: fixed;
  right: 3%;
  bottom: 5%;
  font-size: 30px;
}
</style>