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
      clientID: '58eb9e2337215272e65e',
      clientSecret: '8eaa9e69b93e85a7e78677d4e19c539a05d9dc16',
      repo: '2020807070',
      owner: '2020807070',
      admin: ['2020807070'],
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
