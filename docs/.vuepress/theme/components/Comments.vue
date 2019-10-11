<template>
  <div id="gitalk-container"></div>
</template>

<script>
import Gitalk from 'gitalk'
import 'gitalk/dist/gitalk.css'
export default {
  computed: {
    data() {
      return this.$page.frontmatter;
    }
  },
  mounted () {
    this.createValine();
  },
  methods: {
    createValine() {
      var gitalk = new Gitalk({
      clientID: 'e5d6bfc205c709e29e62',
      clientSecret: '1375c471fb411fe18c687431716bf9587cddf546',
      repo: '2020807070',
      owner: '2020807070@qq.com',
      admin: ['2020807070@qq.com'],
      id: location.pathname,      // Ensure uniqueness and length less than 50
      distractionFreeMode: false  // Facebook-like distraction free mode
    })

    gitalk.render('gitalk-container')
    }
  }
};
</script>


<style lang="stylus">
</style>
