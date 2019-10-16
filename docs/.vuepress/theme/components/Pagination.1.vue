<!-- Pagination 分页 当数据量过多时，使用分页分解数据 -->
<template>
  <ul class="pagination-wrap" v-if="!false">
    <!-- prev, pager, next -->
    <!-- <li @click="currentChange('prev')" class="iconfont iconhoutui"></li> -->
    <li class="pag-atcive" v-if="!total">{{ currentPage }}</li>
    <li
      :class="item === currentPage ? 'pag-atcive' :''"
      v-for="item in Math.ceil(total / pageSize)"
      :key="item"
      @click="currentChange(item)"
    >{{ item }}</li>
    <!-- <li @click="currentChange('next')" class="iconfont iconqianjin"></li> -->
  </ul>
  <ul class="pagination-wrap style2" v-else>
    <!-- prev, pager, next -->
    <li @click="currentChange('prev')" class="button">上一页</li>
    <div class="pagination-style-2">
      <span class="currentPage">{{currentPage}}</span>
      <span class="line"></span>
      <span class="pageSize">{{ Math.ceil(total/ pageSize) }}</span>
    </div>
    <li @click="currentChange('next')" class="button">下一页</li>
  </ul>
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
.pagination-wrap {
  align-items: center;
  justify-content: center;
  list-style: none;
  display: flex;
  margin-bottom: 20px;

  li {
    // 变脸
    color: #010a13;
    cursor: pointer;
    // 变量
    background-color: #fff;
    align-items: center;
    justify-content: center;
    display: flex;
    width: 30px;
    height: 30px;
    // box-shadow 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12)
    &:hover {
      background: #010a13;
      color: #fff;
    }
  }

  .pag-atcive {
    // @TODO 变量
    background: #010a13;
    color: #fff;
  }

  .iconfont {
    font-size: 12px;
    background: rgba(0, 0, 0, 0);
  }
}


// 第二种分页器
.pagination-style-2 {
  width 100px
  display flex
  justify-content center
  align-items center
  .currentPage {
    font-size 30px
    position relative
    top -20px
    left 30px
    
    
  }
  .pageSize {
    font-size 30px
    position relative
    top 20px
    left -30px
    
  }
  .line {
    width 80px
    height 2px
    // @TODO
    background #010a13
    transform rotate(-60deg)
  }
}

.button {
  width 100px!important
  &:hover {
    background #010a13
    color #fff
  }
}

.style2 {
  justify-content space-between
}
</style>