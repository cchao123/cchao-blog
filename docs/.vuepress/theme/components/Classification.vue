<template>
  <article-card>
    <div class="card-title" slot="card-title">
      <span>Classification</span>
      <span class="iconfont icongengduo"></span>
    </div>
    <div class="card-content classification-content" slot="card-content">
      <ul>
        <li><i class="iconfont iconfolder-line" /><span>Vue</span></li>
        <li><i class="iconfont iconfolder-line" /><span>React</span></li>
        <li><i class="iconfont iconfolder-line" /><span>Node</span></li>
        <li><i class="iconfont iconfolder-line" /><span>CDN</span></li>
        <li><i class="iconfont iconfolder-line" /><span>Javascript</span></li>
      </ul>
    </div>
  </article-card>
</template>

<script>
import ArticleCard from "./ArticleCard.vue";
import SearchBox from "./SearchBox.vue";

export default {
  props: {
    tags: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      tagItem: ''
    }
  },
  components: { ArticleCard, SearchBox },
  methods: {
    clearTags () {
      this.tagItem = ''
      this.$emit('tag-fillter', null)
    },
    tagFillter (item) {
      this.$emit('tag-fillter', item)
    }
  },
};
</script>
<style lang="stylus" scoped>
.classification-content
  font-size 12px
  cursor pointer
  display flex
  flex-wrap wrap
  justify-content space-between
  // justify-content space-around
  justify-content flex-start
  ul
    margin 0
    padding-left 10px
    li
      display flex
      align-items center
      span
        position relative
        transition .3s
        &:after
          transition .3s
          left 50%
          bottom 0
          width 0
          content ''
          position absolute
          height 2px
          background #000
        &:before
          transition .3s
          right 50%
          bottom 0
          width 0
          content ''
          position absolute
          height 2px
          background #000
        &:hover
          &:after
            width 50%
          &:before
            width 50%
      .iconfont
        margin-right 5px
        color #000
        font-size 20px!important

</style>