<template>
  <article-card>
    <div class="card-title" slot="card-title">标签</div>
    <div class="card-content tags-content" slot="card-content">
      <span class="tags-item" v-for="item in tags">{{ item }}</span>
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
  components: { ArticleCard, SearchBox }
};
</script>
<style lang="stylus">
.tags-content
  display flex
  flex-wrap wrap
  // justify-content space-between
  justify-content space-around
  .tags-item
    font-size 12px
    color #fff
    margin 5px
    padding 3px 5px
    background red
</style>