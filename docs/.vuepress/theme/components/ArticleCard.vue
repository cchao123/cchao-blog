<template>
  <div class="article-card">
    <slot name="card-title"></slot>
    <slot name="card-content"></slot>
  </div>
</template>

<style lang="stylus">
.article-card
  overflow hidden
  box-shadow 5px 5px 10px rgb(224,246,249)
  background white
  padding 20px
  border-radius 8px
  margin-bottom 20px
  .card-title
    font-size 10px
    padding-bottom 10px
    margin-bottom 10px
    position relative
</style>
