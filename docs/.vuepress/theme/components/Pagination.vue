<template>
  <div class="pagination">
    <div class="p-prev" @click="currentChange('prev')"><i class="iconfont iconshangyiye" /><span>Prev</span></div>
    <span>{{ currentPage }}/ {{ pageSize }}</span>
    <div class="p-next" @click="currentChange('next')"><span>Next</span><i class="iconfont iconxiayiye" /></div>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      default: 1 // 当前页码
    },
    total: {
      type: Number,
      default: 0 // 总条目数
    },
    pageSize: {
      type: Number,
      default: 3 // 一页几条
    }
  },
  data() {
    return {};
  },
  methods: {
    currentChange(item) {
      if (item === this.currentPage) return
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      if (!isNaN(item)) this.$emit("current-change", item);
      var page = this.currentPage;
      if (item === "prev" && this.currentPage > 1) {
        this.$emit("current-change", --page);
      }
      if ( item === "next" && this.currentPage < Math.ceil(this.total / this.pageSize)) {
        this.$emit("current-change", ++page);
      }
    }
  }
};
</script>

<style lang="stylus">
.pagination {
  font-size 12px
  color #0e1725
  display flex
  justify-content space-between
  padding 12px 0
  div {
    display flex
    align-items center
    border-radius 3px
    padding 3px 5px
    transition .3s
    box-shadow: 5px 5px 10px #e0f6f9
    cursor pointer
    &:hover {
      box-shadow 5px 5px 10px #c8e9ee
    }
  }
}
</style>