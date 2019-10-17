<template>
  <component :is="$page.frontmatter.page"/>
</template>

<script>
import FriendsLayout from "./FriendsLayout.vue";
import TagsLayout from "./TagsLayout.vue";


export default {
  components: {
    FriendsLayout,
    TagsLayout
  }
}
</script>


<style>
.page-layout {
  background: #fff;
  box-sizing: border-box;
  max-width: 1200px;
  margin: 0px auto;
  margin-top: 20px;
  padding: 20px 30px;
  box-shadow: 5px 5px 10px #e0f6f9;
  border-radius: 8px;
}
</style>
