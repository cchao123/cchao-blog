<template>
  <div class="page-layout">
    <transition-group appear tag="ul">
      <li
        @click="openBlog"
        class="item shake-slow"
        v-for="(item, ind) in friendsList"
        :key="ind"
        :style="`transition-delay: ${ind * 0.15}s`"
      >{{item.name}}</li>
    </transition-group>
    <Comments v-bind:is="viewComments"></Comments>
  </div>
</template>

<script>
import Comments from "./Comments.vue";
export default {
  data() {
    return {
      viewComments: "Comments"
    };
  },
  components: { Comments },
  computed: {
    friendsList() {
      return this.$site.pages[10].frontmatter.friends;
    }
  },
  mounted() {
    console.log(this.$site.pages[10].frontmatter);
  },
  methods: {
    openBlog() {}
  }
};
</script>

<style lang="stylus" scoped>
@import './../styles/config.styl';
@import './../styles/shake-slow.styl';

// .v-enter, .v-leave-to {
//   opacity: 0;
//   transform: translateY(80px);
// }

// .v-enter-active, .v-leave-active {
//   transition: all 0.6s ease;
// }

ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  li {
    border-radius: 8px;
    text-align: center;
    justify-content: center;
    align-items: center;
    width: 300px;
    margin-top: 20px;
    border: 1px solid #e4e4ee;
  }
}

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

@media (max-width: $MQMobile) {
  .page-layout {
    margin-top: 0;
  }
}

@media (max-width: $MQMobileNarrow) {
  .page-layout {
  }
}
</style>
