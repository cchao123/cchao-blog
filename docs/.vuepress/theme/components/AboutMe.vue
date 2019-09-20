<template>
  <article-card style="margin-top: 100px">
    <div slot="card-content">
      <div class="author">
        <img
          class="author-head"
          :src="$page.frontmatter.head || 'http://cchao.123hao123.top/images/head.gif'"
          alt="headimg"
        >
        <!-- <div class="card-title" slot="card-title">About Me</div> -->
        <!-- TODO这里太丑了 -->
        <div class="author-info">
          <div class="info-item">
            <i class="iconfont iconwenzhang"></i>
            <CountUp startNum="0" :endNum="postsNum" times="10" speed="50"/>
          </div>
          <!-- <div class="info-item">
            <i class="iconfont iconwenjianjia"></i>
            <CountUp startNum="0" :endNum="classNum" times="10" speed="50" />
          </div>-->
          <div class="info-item">
            <i class="iconfont icontag"></i>
            <CountUp startNum="0" :endNum="tagsNum" times="10" speed="50"/>
          </div>
        </div>
        <!-- <div class="introduction">{{ introduction }}</div> -->
      </div>
    </div>
  </article-card>
</template>

<script>
import ArticleCard from "./ArticleCard.vue";
import CountUp from "./CountUp";
export default {
  // props: {
  //   postsNum: {
  //     type: Number,
  //     default: 0
  //   },
  //   classNum: {
  //     type: Number,
  //     default: 0
  //   },
  //   tagsNum: {
  //     type: Number,
  //     default: 0
  //   }
  // },
  data() {
    return {
      postsNum: 0,
      tagsNum: 0,
      introduction: ""
    };
  },
  components: { ArticleCard, CountUp },
  mounted() {
    if (!sessionStorage.getItem("introduction")) {
      sessionStorage.setItem(
        "introduction",
        this.$page.frontmatter.introduction
      );
    }
    setTimeout(() => {
      this.postsNum = sessionStorage.getItem("postsNum");
      this.tagsNum = sessionStorage.getItem("tagsNum");
      this.introduction = sessionStorage.getItem("introduction");
    }, 0);
  },
  computed: {
    options() {
      return {
        useEasing: true,
        useGrouping: true,
        separator: "",
        decimal: ".",
        decimalPlaces: "",
        prefix: "",
        suffix: ""
      };
    }
  }
};
</script>

<style lang="stylus" scoped>
.author {
  .author-head {
    border-top-left-radius: 59%;
    border-top-right-radius: 52%;
    border-bottom-left-radius: 59%;
    border-bottom-right-radius: 56%;
    -webkit-transform: rotate(-6deg);
    -ms-transform: rotate(-6deg);
    transform: rotate(-6deg);
    width: 192px;
    height: 192px;
    transition: 0.5s;
    display: table;
    margin: -120px auto 30px;
    padding: 5px;
    border: 1px solid #e0e0e0;
    border: 3px solid #e0e0e0;
    background-color: #fff;
    img {
      border-radius: 50%;
    }
    &:hover {
      border-top-left-radius: 52%;
      border-top-right-radius: 49%;
      border-bottom-left-radius: 54%;
      border-bottom-right-radius: 58%;
      -webkit-transform: rotate(0);
      -ms-transform: rotate(0);
      transform: rotate(0);
    }
  }
}

.introduction {
  text-align: center;
  margin-top: 15px;
}

.author-info {
  cursor: pointer;
  display: flex;

  .info-item {
    &:nth-child(1) {
      border: 0;
    }

    border-left: 1px dashed #e0e0e0;
    text-align: center;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;

    i {
      font-size: 20px;
    }

    span {
      font-size: 10px;
      justify-content: center;
    }
  }
}

.atc-title {
  border-left: 5px solid red;
  padding-left: 5px;
}
</style>