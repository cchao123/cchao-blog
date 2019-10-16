<template>
  <article-card>
    <div class="card-title" slot="card-title">
      <span>Tags</span>
      <span class="iconfont icongengduo"></span>
    </div>
    <div class="card-content tags-content" slot="card-content">
      <span :class="tagItem === item ? 'tags-item tags-active' : 'tags-item' " v-for="item in tags" @click="tagFillter(item)"># {{ item }}
        <i v-show="tagItem === item" @click.stop="clearTags" class="iconwebicon309 iconfont"></i>
      </span>
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
<style lang="stylus">
.iconqinglihuancun
  cursor pointer
  font-size 20px!important

.tags-content
  cursor pointer
  display flex
  flex-wrap wrap
  justify-content space-between
  // justify-content space-around
  justify-content flex-start
  .tags-item
    position relative
    font-size 12px
    // @TODO 变量
    color #fff
    color #8a92a9
    color #2c3e50
    margin 5px
    padding 3px 5px
    // @TODO 变量
    background-color rgb(44,62,80)
    background-color rgb(170, 170, 170)
    background-color #f4f6f9
    background-color #fff
    transition .5s
    border-radius 3px
    i
      position absolute
      font-size 14px
      right -5px
      top -5px
      width 12px
      height 12px
      border-radius 50%
      text-align center
      line-height 12px
      display flex
      justify-content center
      align-items center
      // @TODO 变量
      background-color #010a13
    &:hover
      background-color #010a13
      color #fff
  .tags-active
      background-color #010a13
      color #fff

</style>