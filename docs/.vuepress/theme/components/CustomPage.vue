<template>
  <div :data-page="$page.frontmatter.page" class="page-layout translateIn">
    <component :is="$page.frontmatter.page"/>
  </div>
</template>

<script>
import FriendsLayout from "./FriendsLayout.vue";
import AboutMe from "./AboutMe.vue";


export default {
  components: {
    FriendsLayout,
    AboutMe
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
