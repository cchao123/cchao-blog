<template>
  <div class="article-card">
    <slot name="card-title"></slot>
    <slot name="card-content"></slot>
  </div>
</template>

<style lang="stylus">
.article-card
  transition .3s
  overflow hidden
  box-shadow 5px 5px 10px rgb(224,246,249)
  background white
  padding 20px
  border-radius 8px
  margin-bottom 25px
  &:hover {
    box-shadow 5px 5px 10px #c8e9ee
  }
  .card-title
    font-size 10px
    padding-bottom 10px
    margin-bottom 10px
    position relative
    display flex
    justify-content space-between
    // border-bottom 1px solid rgba(0, 0, 0, .05)
    .iconfont
      color #8a92a9
      font-size 12px
      cursor pointer
</style>
