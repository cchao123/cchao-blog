<template>
  <article-card style="overflow: visible">
    <div slot="card-content">
      <SearchBox />
    </div>
  </article-card>
</template>

<script>
import ArticleCard from './ArticleCard.vue'
import SearchBox from "./SearchBox.vue";

export default {
  components: { ArticleCard , SearchBox}
}
</script>
