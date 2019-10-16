<template>
  <div class="page-layout">
    {{this.$site}}
    <Comments ></Comments>
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
  components: { Comments }
};
</script>

<style lang="stylus">
@import './../styles/config.styl';
@import './../styles/shake-slow.styl';

.v-enter, .v-leave-to {
  opacity: 0;
  transform: translateY(80px);
}

.v-enter-active, .v-leave-active {
  transition: all 0.6s ease;
}

ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.item {
  border-radius: 8px;
  text-align: center;
  justify-content: center;
  align-items: center;
  width: 300px;
  margin-top: 20px;
  border: 1px solid #ccc;
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
