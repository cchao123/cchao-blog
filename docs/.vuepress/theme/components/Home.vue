<template>
  <div class="home">
    <ArticleWrap :posts="this.$site.pages" @toast-show="toastShow"/>
    <Content custom/>
    <!-- <div class="footer" v-if="data.footer">
      <div class="footer-container">
        <div class="f-top" v-if="false">
          <div class="f-aside">
            <h3>关于</h3>
            <p>ZdasdasasdsadsasdasddsadadasdasjkdaskldsadFDASKLJDA架飞机卡拉斯科拉进口量式ZdasdasasdsadsasdasddsadadasdasjkdaskldsadFDASKLJDA架飞机卡拉斯科拉进口量式ZdasdasasdsadsasdasddsadadasdasjkdaskldsadFDASKLJDA架飞机卡拉斯科拉进口量式</p>
          </div>
          <div class="f-aside">
            <h3>最近文章</h3>
            <ul>
              <li>阿里云的服务器...</li>
              <li>嘻嘻</li>
              <li>嘻嘻</li>
              <li>嘻嘻</li>
              <li>嘻嘻</li>
            </ul>
          </div>
          <div class="f-aside">
            <h3>哈哈哈</h3>
          </div>
        </div>
        <div class="f-bottom" v-if="false">
          <a v-for="item in this.$site.themeConfig.nav" :href="item.link">{{ item.text }} - </a>
          <div class="f-links">
            <i class="iconfont iconsf"></i>
            <i class="iconfont iconcsdn"></i>
            <i class="iconfont iconjuejin"></i>
            <i class="iconfont iconjianshu1"></i>
            <i class="iconfont icongithub1"></i>
          </div>
        <p>Copyright © 2011-2019 cchao ©</p>
      </div>
      </div>
    </div> -->
    <div class="footer">
      <div class="footer-container">
        <!-- <div class="f-links">
          <i class="iconfont iconsf"></i>
          <i class="iconfont iconcsdn"></i>
          <i class="iconfont iconjuejin"></i>
          <i class="iconfont iconjianshu1"></i>
          <i class="iconfont icongithub1"></i>
        </div> -->
        <p class="copy-right">
          晋ICP备16007968号-5
          <br>
        Copyright © 2011-2019 cchao blog  </p>
      </div>
    </div>
    <Toast ref="Toast"/>
  </div>
</template>

<script>
import NavLink from "./NavLink.vue";
import ArticleWrap from "./ArticleWrap.vue";
import Toast from "./Toast";

export default {
  components: { NavLink, ArticleWrap, Toast },

  computed: {
    data() {
      return this.$page.frontmatter;
    },

    actionLink() {
      return {
        link: this.data.actionLink,
        text: this.data.actionText
      };
    }
  },
  mounted() {
    console.log(this.$site);
  },
  methods: {
    toastShow(lenght) {
      this.$refs.Toast.show(`共筛选出${lenght}条`);
    }
  }
};
</script>

<style lang="stylus">
@import './../styles/config.styl';

.home {
  // padding: $navbarHeight 0rem 0;
  // max-width: 1200px;
  margin: 0px auto;

  .hero {
    text-align: center;

    img {
      max-height: 280px;
      display: block;
      margin: 3rem auto 1.5rem;
    }

    h1 {
      font-size: 3rem;
    }

    h1, .description, .action {
      margin: 1.8rem auto;
    }

    .description {
      max-width: 35rem;
      font-size: 1.6rem;
      line-height: 1.3;
      color: lighten($textColor, 40%);
    }

    .action-button {
      display: inline-block;
      font-size: 1.2rem;
      color: #fff;
      background-color: $accentColor;
      padding: 0.8rem 1.6rem;
      border-radius: 4px;
      transition: background-color 0.1s ease;
      box-sizing: border-box;
      border-bottom: 1px solid darken($accentColor, 10%);

      &:hover {
        background-color: lighten($accentColor, 10%);
      }
    }
  }

  .features {
    border-top: 1px solid $borderColor;
    padding: 1.2rem 0;
    margin-top: 2.5rem;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    align-content: stretch;
    justify-content: space-between;
  }

  .feature {
    flex-grow: 1;
    flex-basis: 30%;
    max-width: 30%;

    h2 {
      font-size: 1.4rem;
      font-weight: 500;
      border-bottom: none;
      padding-bottom: 0;
      color: lighten($textColor, 10%);
    }

    p {
      color: lighten($textColor, 25%);
    }
  }

  .footer {
    box-shadow: 0 5px 60px 0 rgba(17,58,93, .1);
    background: #010a13;
    padding: 10px;
    .footer-container {
      text-align left
      max-width: 1200px;
      margin: 0 auto;
      color #fff
    }   
    .copy-right {
      font-size 12px
      padding 10px 0
      border-top 1px solid #0e1725
    }
  //   font-size: 12px;
  //   border-top: 1px solid $borderColor;
  //   color: lighten($textColor, 25%);
  //   color: #fff;

  //   .footer-container {
  //     height 300px
  //     width: 1200px;
  //     margin: 0 auto;
  //     display: flex;
  //     flex-direction: column;

  //     .f-top {
  //       padding: 10px;
  //       display: flex;

  //       .f-aside {
  //         flex: 1;
  //         margin-right: 50px;
  //       }
  //     }

  //     .f-bottom {
  //       padding: 10px;
  //       color: #cbcfd8;
  //       border-top: 1px solid #0e1725;

  //       .f-links {
  //         // float right
  //       }
  //     }
  //   }

  //   i {
  //     font-size: 20px;
  //     transition: 0.3s;
  //     color: #cbcfd8;
  //     padding: 0 10px;

  //     &:hover {
  //       color: #fff;
  //     }
  //   }
  }
}

@media (max-width: $MQMobile) {
  .home {
    .features {
      flex-direction: column;
    }

    .feature {
      max-width: 100%;
      padding: 0 2.5rem;
    }
  }
}

@media (max-width: $MQMobileNarrow) {
  .home {
    // padding-left: 1.5rem;
    // padding-right: 1.5rem;
    .hero {
      img {
        max-height: 210px;
        margin: 2rem auto 1.2rem;
      }

      h1 {
        font-size: 2rem;
      }

      h1, .description, .action {
        margin: 1.2rem auto;
      }

      .description {
        font-size: 1.2rem;
      }

      .action-button {
        font-size: 1rem;
        padding: 0.6rem 1.2rem;
      }
    }

    .feature {
      h2 {
        font-size: 1.25rem;
      }
    }
  }
}
</style>
