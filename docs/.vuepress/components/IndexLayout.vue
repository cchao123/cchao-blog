<template>
  <div class="ets-index-wrapper">
    首页
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  mounted() {
    console.log(this.$page.frontmatter)
  },
}
</script>

<style lang="stylus">
.ets-index-wrapper {
  width: 100%;
}
</style>
