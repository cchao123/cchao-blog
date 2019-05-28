<template>
  <div class="vcomment">
    <div id="vcomments"></div>
  </div>
</template>

<script>
export default {
  computed: {
    data() {
      return this.$page.frontmatter;
    }
  },
  mounted: function() {
    this.createValine();
  },
  methods: {
    createValine() {
      const Valine = require("valine");
      window.AV = require("leancloud-storage");
      const valine = new Valine({
        el: "#vcomments",
        appId: this.$site.themeConfig.comments.appId,
        appKey: this.$site.themeConfig.comments.appKey,
        notify: false,
        verify: false,
        avatar: "monsterid",
        path: window.location.pathname,
        placeholder: "来谈一谈对这篇文章的看法吧~"
      });
      this.valineRefresh = false;
    }
  },
  watch: {
    $route(to, from) {
      if (to.path !== from.path) {
        setTimeout(() => {
          //重新刷新valine
          this.createValine();
        }, 300);
      }
    }
  }
};
</script>


<style lang="stylus">
.vcomment {
  background: #fff;
  padding: 20px;
  border-radius: 8px;

  .info {
    display: none;
  }
}
</style>
